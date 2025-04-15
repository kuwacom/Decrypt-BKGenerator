import hashlib
import argparse
from Crypto.Cipher import AES

def decryptBinFile(inputFile, outputFile, gameId, password=""):
    """
    暗号化されたバイナリファイルを復号して出力ファイルへ保存
    :param inputFile: 暗号化済みの .bin 入力ファイルパス
    :param outputFile: 復号後に保存する出力ファイルパス
    :param gameId: ゲーム識別子（暗号鍵の派生に使用）
    :param password: （オプション）パスワード（暗号鍵の派生に使用）
    :return: 復号が成功した場合は True、エラー時は False を返す
    """
    # ゲームIDとパスワードを連結して鍵の種（keySeed）を生成し、
    # SHA256ハッシュを計算して最初の16バイト（sBytes）を取得
    keySeed = gameId + password
    sha256Hash = hashlib.sha256(keySeed.encode('utf-8')).digest()
    sBytes = sha256Hash[:16]

    # 入力ファイルをバイナリモードで読み込み、暗号化済みデータを取得
    with open(inputFile, 'rb') as file:
        encryptedData = file.read()

    # encryptedDataの最後の16バイトを抽出（eBytes）
    eBytes = encryptedData[-16:]
    # 最後の16バイトを除いた残りの部分を取得（hBytes）
    hBytes = encryptedData[:-16]

    # hBytesのSHA256ハッシュの最初の16バイトを取得（nBytes）
    nBytes = hashlib.sha256(hBytes).digest()[:16]
    # eBytes、nBytes、sBytes を XOR 演算してAES暗号鍵（keyBytes）を生成
    keyBytes = bytes([eBytes[i] ^ nBytes[i] ^ sBytes[i] for i in range(16)])

    # hBytesの先頭12バイトを初期化ベクトル（IV）として取得
    iv = hBytes[:12]
    # IV以降の部分を、暗号文とGCMタグが含まれたデータとして取得
    ciphertextWithTag = hBytes[12:]
    # 暗号文部分は、末尾16バイト（タグ）を除いた部分
    ciphertext = ciphertextWithTag[:-16]
    # GCMタグは、暗号文の末尾16バイト
    tag = ciphertextWithTag[-16:]

    try:
        # AESのGCMモードで復号器を生成
        cipher = AES.new(keyBytes, AES.MODE_GCM, nonce=iv)
        # 暗号文の復号およびタグ検証を行う
        decryptedData = cipher.decrypt_and_verify(ciphertext, tag)
    except ValueError as error:
        # タグの検証失敗などにより復号できなかった場合、エラーメッセージを出力して False を返す
        print(f"Decryption Error: {str(error)}")
        return False

    with open(outputFile, 'wb') as file:
        file.write(decryptedData)
    
    return True

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='ブロック崩し アセット複合化')
    parser.add_argument('inputFile', help='暗号化済み .bin アセットファイル')
    parser.add_argument('outputFile', help='復号後の出力ファイル')
    parser.add_argument('--gameId', required=True, help='ゲームID')
    parser.add_argument('--password', default='', help='パスワード（オプション URLの#の後ろのやつをsha256したもの（たしか   ））')
    
    # 引数をパースする
    args = parser.parse_args()
    
    # decryptBinFile 関数を呼び出して復号処理を実施
    if decryptBinFile(args.inputFile, args.outputFile, args.gameId, args.password):
        print(f"Success: {args.inputFile} -> {args.outputFile}")
    else:
        print("Failure: Decryption process failed")
