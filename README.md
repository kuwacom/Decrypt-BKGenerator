# Decrypt-BKGenerator-Image
erir.in/bk/works ブロック崩しジェネレーターのデータアセット複合化ツール

# 複合化ガイド
令和最新版 使い方完全ガイド

## コマンドラインスクリプトの使用方法

```bash
python decryptAsset.py [入力ファイル名] [出力ファイル名] --gameId [ゲームID] --password [パスワード(ある場合)]
```

### パラメータ詳細
- 入力ファイル：暗号化された.binファイルのパス
- 出力ファイル：復号結果の保存先パス
- gameId：ゲーム固有識別子（bk_config内のid値）
- password：URLハッシュ値（#以降の文字列）

### 実行例
> 基本形
```bash
python decryptAsset.py stage1.bin stage1.png --gameId "example123"
```
> パスワード付き
```bash
python decryptAsset.py stage0.bin stage0.json --gameId "example123" --password "x7f9k2"
```
> 楽する時
```bash
find . -name "img_*.bin" -print0 | xargs -0 -I{} bash -c 'python decryptAsset.py "{}" "${0%.bin}.png" --gameId "example123"' {}
```

## bk_configの設定内容解析

### 主要データ構造
```js
window.bk_config = {
  id: "example123",          // ゲーム識別子（必須）
  assetBase: "/assets",   // アセットベースURL
  meta: "aGVsbG8...",     // Base64エンコードされたメタデータ
  hidden: true,           // パスワード保護フラグ
  version: 1.2            // データフォーマットバージョン
}
```

### メタデータ構造
```
[
  "ゲームタイトル",
  "説明文\n改行可能",
  "作者名",
  "作者URL",
  "2023-01-01T00:00:00", // 公開日時
  false,                 // R-18フラグ
  true,                  // AI生成フラグ
  "追加メタデータ"        // 任意フィールド
]
```

## アセット復号化について

### 暗号化フロー
1. 鍵導出：SHA256(gameId + password)
2. 暗号化方式：AES-GCM
   - IV長：12byte
   - 認証タグ：16byte
   - 鍵長：256bit

### 復号プロセス

1. ファイル末尾16byteを抽出（eBytes）
2. 残りデータのSHA256を計算（nBytes）
3. 鍵生成：key = eBytes XOR nBytes XOR derivedKey
4. AES-GCMで復号実行
   - IV：ファイル先頭12byte
   - 暗号文：13byte〜末尾-16byte
   - タグ検証：最後の16byte

## アセットパス特定について

### 生成ロジック
```
sha256(gameId + password + "/" + assetType + stageNum)
```
例：
> パスワードなし
```
sha256("game123/stage1") → "13fc...6338"
```
> パスワードあり
```
sha256("game123x7f9k2/stage1") → "553b....31b5"
```

### 生成後フォーマット
```
https://example.com/bk/data/{gameId}/{hash}.bin
```
例：
```
https://example.com/bk/data/example123/13fc...6338.bin
```

### 主要アセットタイプ
| パターン         | type       | 内容                | 例           |
|-----------------|------------|---------------------|--------------|
| stage{num}      |            | ステージ定義データ    | stage0.bin  |
| img_{type}{num} | `fg`, `bg` | 画像リソース         | img_fg0.bin  |
| clear{num}      |            | クリア特典データ      | clear0.bin  |

## 実践的解析手法

### コード解析ポイント
1. `pt()`：アセットパス生成処理
2. `bt()`：ステージデータ読み込み
3. `Ct()`：ゲームデータ初期化