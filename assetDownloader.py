import hashlib
import argparse
import requests
from Crypto.Cipher import AES
from urllib.parse import urljoin

class AssetDownloader:
    def __init__(self, baseUrl, gameId, password=""):
        """
        コンストラクタ:
        - baseUrl: アセットが置かれているベースのURL
        - gameId: ゲーム固有の識別子
        - password: （オプション）パスワード（暗号化・ハッシュに使用）
        """
        self.baseUrl = baseUrl
        self.gameId = gameId
        self.password = password
    
    def __generateAssetName(self, assetType, assetNumber):
        """
        アセットの種類（例: fg, bg, stage, clear）に応じたファイル名を生成する内部メソッド
        :param assetType: アセットの種類（例："fg", "bg", "stage", "clear"）
        :param assetNumber: アセットの連番
        :return: 生成されたアセット名
        """
        assetMap = {
            "fg": f"img_fg{assetNumber}",
            "bg": f"img_bg{assetNumber}",
            "stage": f"stage{assetNumber}",
            "clear": f"clear_image{assetNumber}"
        }
        # 指定のassetTypeが存在しなければ、"unknown" + assetNumber を返す
        return assetMap.get(assetType, f"unknown{assetNumber}")

    def __deriveKey(self):
        """
        ゲームIDとパスワードから暗号鍵の種を生成し、SHA256でハッシュ化し、最初の16バイトを取り出して返す。
        :return: 16バイトのバイナリ暗号鍵
        """
        keySeed = self.gameId + self.password
        # UTF-8でエンコード後、SHA256ハッシュを計算し、最初の16バイトを使用
        return hashlib.sha256(keySeed.encode('utf-8')).digest()[:16]

    def __downloadEncryptedData(self, assetName):
        """
        指定されたアセット名に基づいて、暗号化されたバイナリデータをダウンロードする内部メソッド。
        パスワードの有無に応じて、URLの生成方法が異なる。
        
        :param assetName: 対象のアセット名
        :return: ダウンロードしたバイナリデータ
        """
        if self.password:
            # パスワードがある場合、gameId, password, assetNameを連結してSHA256ハッシュを作成
            hashedName = hashlib.sha256((self.gameId + self.password + "/" + assetName).encode()).hexdigest()
            # baseUrl, gameIdおよびハッシュを結合して最終的なURLを生成
            url = urljoin(self.baseUrl, f"{self.gameId}/{hashedName}.bin")
        else:
            # パスワードがない場合の処理：gameIdとassetNameの連結文字列でハッシュを生成
            hashedName = hashlib.sha256((self.gameId + "/" + assetName).encode()).hexdigest()
            url = urljoin(self.baseUrl, f"{self.gameId}/{hashedName}.bin")
        
        # 指定のURLからGETリクエストを送ってデータを取得
        response = requests.get(url)
        response.raise_for_status()
        return response.content

    def __decryptData(self, encryptedData, derivedKey):
        """
        暗号化データを復号する内部メソッド
        ・暗号化データの最後の16バイトを利用して、実際のAESキーを構成するための情報を生成
        ・前半部分は IV と暗号文・タグに分けられる
        
        :param encryptedData: ダウンロードした暗号化済みのデータ
        :param derivedKey: __deriveKey()で作成した16バイトの鍵
        :return: 復号後の平文データ
        """
        # 暗号化データの最後の16バイトを抽出
        last16Bytes = encryptedData[-16:]
        # 最後の16バイトを除いたデータ
        dataMinusLast16 = encryptedData[:-16]
        
        # dataMinusLast16のSHA256ハッシュの最初の16バイトを使用
        hashH = hashlib.sha256(dataMinusLast16).digest()[:16]
        # XOR演算で3つのバイト列（last16Bytes, hashH, derivedKey）を組み合わせて実際のAES鍵を生成
        keyBytes = bytes([last16Bytes[i] ^ hashH[i] ^ derivedKey[i] for i in range(16)])
        
        # 暗号文の分割:
        # 先頭12バイト：初期ベクトル (IV)
        iv = dataMinusLast16[:12]
        # 残りは暗号文とGCMタグが含まれている部分
        ciphertextWithTag = dataMinusLast16[12:]
        
        # AESのGCMモードで復号器を生成（IVを指定）
        cipher = AES.new(keyBytes, AES.MODE_GCM, nonce=iv)
        # 復号およびタグの検証: 最後の16バイトがタグ、それ以外が暗号文本体
        return cipher.decrypt_and_verify(ciphertextWithTag[:-16], ciphertextWithTag[-16:])

    def fetchAsset(self, assetType, assetNumber, outputFile):
        """
        外部に公開するメソッド。指定されたアセットタイプと連番から、対応するアセットをダウンロードし復号後に
        指定の出力ファイルに保存する。
        
        :param assetType: アセットの種類（例: fg, bg, stage, clear）
        :param assetNumber: アセット番号（整数）
        :param outputFile: 保存先の出力ファイルパス
        :return: 正常に処理が完了した場合Trueを返す
        """
        # アセット名を生成
        assetName = self.__generateAssetName(assetType, assetNumber)
        # 暗号化データをダウンロード
        encryptedData = self.__downloadEncryptedData(assetName)
        # 暗号鍵を派生
        derivedKey = self.__deriveKey()
        
        # ダウンロードしたデータを復号
        decryptedData = self.__decryptData(encryptedData, derivedKey)
        
        with open(outputFile, 'wb') as f:
            f.write(decryptedData)
        return True

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Download and decrypt game assets')
    parser.add_argument('baseUrl', help='Base URL for assets')
    parser.add_argument('gameId', help='Game identifier')
    parser.add_argument('assetType', choices=[
        'fg', 'bg', 
        'stage', 'clear'
    ], help='Type of asset to download')
    parser.add_argument('assetNumber', type=int, help='Asset number')
    parser.add_argument('--outputFile', default='', help='Output file path')
    parser.add_argument('--password', default='', help='Optional password')
    
    
    args = parser.parse_args()

    downloader = AssetDownloader(args.baseUrl, args.gameId, args.password)

    assetTypeMap = {
        "fg": "png",
        "bg": "png",
        "stage": "json",
        "clear": "png"
    }

    if args.outputFile == '':
        args.outputFile = f"{args.assetType}_{args.assetNumber}.{assetTypeMap[args.assetType]}"
    
    try:
        if downloader.fetchAsset(args.assetType, args.assetNumber, args.outputFile):
            print(f"Successfully downloaded and decrypted {args.assetType} #{args.assetNumber}")
            print(f"Saved to: {args.outputFile}")
    except Exception as e:
        print(f"Error: {str(e)}")
        exit(1)
