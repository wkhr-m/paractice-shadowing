# PracticeShadowing

シャドーイングの練習を助けるウェブアプリケーション。

## 使用しているWEB API
- [Words API](https://rapidapi.com/dpventures/api/wordsapi)
上記のウェブサイトで登録をして/src/environments下の各xRapidApiKeyを書き直す必要がある。
これをやらないと単語の内容が見れない。

## 使い方
1. 記事をセットする
src/assets下にcontent.json(記事の内容)とaudio.mp3(記事の音声ファイル)をセットする。
content.json
```json
{
  "type": "article",
  "id": "the-best-gift-i-ever-survived",
  "title": "The best gift I ever survived",
  "url": "https://example.com",
  "pharases": [
    {
      "en": "It will recalibrate what's most important in your life.",
      "ja": "人生で最も重要なことを再確認させてくれます",
      "pronaunce": "ɪt wɪl ˌriˈkæləˌbreɪt wʌts moʊst ɪmˈpɔrtənt ɪn jʊər laɪf.",
      "time": { "start": 36000, "end": 39000 }
    },
  ]
}
```

2. navigation.jsonに追加する
このときidは上のidと一致させる

3. yarn setup

4. yarn start