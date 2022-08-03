# 投票系統

一個小型專案，目標為練習：docker-compose, gcp 架設（包含處理網域、憑證以及 nginx 設定）

## 目錄

- [功能介紹](#功能介紹)
- [使用方式](#使用方式)
- [安裝流程](#安裝流程)

## 功能介紹

### user部分

- user 可以使用香港身分證以及電子信箱登入至 DB 內

- user 登入後可以看到目前候選人票數狀況

- user 若有進行投票，在選舉結束後會收到選舉戰況的 email

### admin 部分

- admin 可以新建一筆選舉

- admin 可以新建候選人（**_不可刪除_**）

- admin 可以看個別候選人即時戰況（包含投票數、誰投給他）

- admin 可以查詢選舉戰況

## 安裝流程

### docker(optional)

1. `git clone https://github.com/rayray1010/election.git`

2. 若有安裝 `docker` ，可以把專案 clone 下來後以指令：  
`docker-compose up -d --build` 即可操作

### local 部署

1. `git clone https://github.com/rayray1010/election.git`

2. 打開本機的 mongoDB

3. 進入專案 folder 內下指令: `npm install`

4. 在 terminal下指令： `npm run server_dev` 即可啟動專案

### 簡易 API 文件

> 有關寄信功能因為涉及到作者信箱相關敏感資訊，所以本地沒有寄信功能。

> 完整功能請至線上部署站： [https://daniel10.tk/](https://daniel10.tk/)

## User 相關

`POST /user/` : 創建 user

  requestBody:

  ```json
  {
    "name": "daniel",
    "email": "daniel@test.com",  // 這邊要輸入真實 email 才收得到信件
    "IdNumber": "A123456(7)" // 香港身分證字號
  }
  ```

  response:

  ```json
  {
    "email": "daniel@test.com",
    "name": "daniel",
    "IdNumber": "A123456(7",
    "_id": "62e9f1d653420d3f6e48b6a2",
    "votedRecord": [],
    "createdAt": "2022-08-03T03:56:06.779Z",
    "updatedAt": "2022-08-03T03:56:06.779Z",
    "__v": 0
  }
  ```

`Get /user/userId` : 拿 user 資訊

  request params: `user/62e9f5bea472c49861ae8db5`

  response:

  ```json
  {
    "_id": "62e9f5bea472c49861ae8db5",
    "email": "da8668103@gmail.com",
    "name": "瑞瑞5",
    "IdNumber": "F123458(2)",
    "votedRecord": [
        {
            "electionId": "62e7f47828d38f4bc85cedc4",
            "candidateId": "62e88b77fec2689bd8eca524",
            "_id": "62e9f5c3a472c49861ae8dba"
        }
    ],
    "createdAt": "2022-08-03T04:12:46.443Z",
    "updatedAt": "2022-08-03T04:12:51.932Z",
    "__v": 0
  }
  ```

`POST /user/vote` : 投票（須先註冊登記過）

  requestBody:

  ```json
  {
    "userId":"62e957c370ad101a10840ae7",
    "candidateId":"62e9591e70ad101a10840aec", // 候選人 userId
    "electionId":"62e95a3270ad101a10840aee" // 選舉場次 id
  }
  ```
  
  response :

  ```json
  {
    "result": "成功投票給 userId: 62e95a3270ad101a10840aee"
  } 
  ```

`POST /user/candidateList` : 拿目前選舉戰況（須先投過票）

  requestBody:

  ```json
  {
    "userId":"62e9f5bea472c49861ae8db5",
    "electionId" : "62e7f47828d38f4bc85cedc4",
  }
  ```

  response:

  ```json
  [
      {
          "_id": "62e7f4ad28d38f4bc85cedca",
          "name": "瑞瑞",
          "beVotedCount": 3
      },
      {
          "_id": "62e7f50e28d38f4bc85cedd0",
          "name": "瑞瑞2",
          "beVotedCount": 1
      },
      {
          "_id": "62e9f40953420d3f6e48b6b0",
          "name": "瑞瑞3",
          "beVotedCount": 1
      }
  ]
  ```
