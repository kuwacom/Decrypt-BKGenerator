# decryptAsset.py
import hashlib
import argparse
from Crypto.Cipher import AES

def decryptBinFile(inputFile, outputFile, gameId, password=""):
    keySeed = gameId + password
    sha256Hash = hashlib.sha256(keySeed.encode('utf-8')).digest()
    sBytes = sha256Hash[:16]

    with open(inputFile, 'rb') as file:
        encryptedData = file.read()

    eBytes = encryptedData[-16:]
    hBytes = encryptedData[:-16]

    nBytes = hashlib.sha256(hBytes).digest()[:16]
    keyBytes = bytes([eBytes[i] ^ nBytes[i] ^ sBytes[i] for i in range(16)])

    iv = hBytes[:12]
    ciphertextWithTag = hBytes[12:]
    ciphertext = ciphertextWithTag[:-16]
    tag = ciphertextWithTag[-16:]

    try:
        cipher = AES.new(keyBytes, AES.MODE_GCM, nonce=iv)
        decryptedData = cipher.decrypt_and_verify(ciphertext, tag)
    except ValueError as error:
        print(f"Decryption Error: {str(error)}")
        return False

    with open(outputFile, 'wb') as file:
        file.write(decryptedData)
    
    return True

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Decrypt Game Asset Files')
    parser.add_argument('inputFile', help='Encrypted .bin input file')
    parser.add_argument('outputFile', help='Decrypted output file')
    parser.add_argument('--gameId', required=True, help='Game identifier')
    parser.add_argument('--password', default='', help='Optional password from URL hash')
    
    args = parser.parse_args()
    
    if decryptBinFile(args.inputFile, args.outputFile, args.gameId, args.password):
        print(f"Success: {args.inputFile} -> {args.outputFile}")
    else:
        print("Failure: Decryption process failed")