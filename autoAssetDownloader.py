import argparse
import requests
from assetDownloader import AssetDownloader

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Download all game assets for each type until a 404 is encountered")
    parser.add_argument("baseUrl", help="Base URL for assets")
    parser.add_argument("gameId", help="Game identifier")
    parser.add_argument("--password", default="", help="Optional password")
    # 無限ループを防ぐため、各asset typeでの最大番号をオプションとして用意
    parser.add_argument("--max", type=int, default=100, help="Maximum asset number to try for each type")
    args = parser.parse_args()

    assetTypeMap = {
        "fg": "png",
        "bg": "png",
        "stage": "json",
        "clear": "png"
    }

    downloader = AssetDownloader(args.baseUrl, args.gameId, args.password)

    # 各アセットタイプごとに連番で取得処理を実行
    for assetType in assetTypeMap.keys():
        print(f"--- Processing asset type: {assetType} ---")
        assetNumber = 0
        # 各タイプで番号がmax値に達するまで繰り返す（無限ループ防止のため）
        while assetNumber <= args.max:
            outputFile = f"{assetType}_{assetNumber}.{assetTypeMap[assetType]}"
            print(f"Requesting {assetType} asset number {assetNumber}...")
            try:
                downloader.fetchAsset(assetType, assetNumber, outputFile)
                print(f"  -> Saved to: {outputFile}")
                assetNumber += 1 # 次の番号へ進む
            except requests.exceptions.HTTPError as http_err:
                # HTTPエラーの場合、404なら該当タイプのアセットが無いとみなし、次のタイプへ移行する
                if http_err.response.status_code == 404:
                    print(f"  -> Asset {assetType} number {assetNumber} not found (404). Moving to next asset type.")
                    break  # 現在の assetType のループを終了
                else:
                    print(f"  -> HTTP Error for {assetType} number {assetNumber}: {http_err}")
                    break
            except Exception as err:
                print(f"  -> Unexpected error for {assetType} number {assetNumber}: {err}")
                break