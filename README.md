# PracticeShadowing

シャドーイングの練習を助けるウェブアプリケーション。

## 使用しているWEB API
- [Words API](https://rapidapi.com/dpventures/api/wordsapi)
上記のウェブサイトで登録をして/src/environments下の各xRapidApiKeyを書き直す必要がある。
これをやらないと単語の内容が見れない。

## 使い方
1. 記事をセットする
src/assets下にcontent.json(記事の内容)とaudio.mp3(記事の音声ファイル)をセットする。
content.jsonの内容
```json
{
  "type": "article", // 固定
  "id": "the-best-gift-i-ever-survived", //URLになるもの
  "title": "The best gift I ever survived", //タイトル
  "url": "https://example.com", //この記事の元のURL
  "pharases": [
    {
      "en": "It will recalibrate what's most important in your life.", // 英語
      "ja": "人生で最も重要なことを再確認させてくれます", // 日本語訳
      "pronaunce": "ɪt wɪl ˌriˈkæləˌbreɪt wʌts moʊst ɪmˈpɔrtənt ɪn jʊər laɪf.", // 発音記号
      "time": { "start": 36000, "end": 39000 } // 音声の再生時間
    },
  ]
}
```

2. navigation.jsonに追加する
navigation.json内のidはcontent.jsonのidと一致させる

3. yarn setup

4. yarn start

## Android PWAのデバッグ方法
androidでPWAとしてインストールする場合は[ngrok](https://ngrok.com/)を使う
```
ng build
npx http-server -p 8080 -c-1 dist/practice-shadowing
http://127.0.0.1:8080
```