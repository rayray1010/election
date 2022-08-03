# 投票系統

一個小型專案，目標為練習：docker-compose, gcp 架設（包含處理網域、憑證以及 nginx 設定）

## 目錄

- [功能介紹](#功能介紹)
- [線上操作](#線上操作)
- [本地安裝流程](#本地安裝流程)
- [遊戲流增](#遊戲流程)

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

## 線上操作

> 已部署至 gcp ，db 採用 atlas db  
>[https://daniel10.tk/](https://daniel10.tk/)

建議使用線上環境進行 api 操作  
關於 email 部分，只有線上環境可以測試使用！

使用部署工具：

- gcp compute engine
- nginx
- atlasDb
- nginx
- pm2
- certbot

## 本地安裝流程

### docker(optional)

1. `git clone https://github.com/rayray1010/election.git`

2. 若有安裝 `docker` ，可以把專案 clone 下來後以指令：  
`docker-compose up -d --build` 即可操作

### local 部署

1. `git clone https://github.com/rayray1010/election.git`

2. 打開本機的 mongoDB

3. 進入專案 folder 內下指令: `npm install`

4. 在 terminal下指令： `npm run server_dev` 即可啟動專案

## 簡易 API 文件

> 有關寄信功能因為涉及到作者信箱相關敏感資訊，所以本地沒有寄信功能。

> 完整功能請至線上部署站： [https://daniel10.tk/](https://daniel10.tk/)

### User 相關

`POST /user/` : 創建 user

  requestBody:

  ```json
  {
    "name": "daniel",
    "email": "daniel@test.com",  // 這邊要輸入真實 email 才收得到信件
    "IdNumber": "A123456(7)" // 香港身分證字號，格式必須相同
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

`GET /user/:userId` : 拿 user 資訊

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

### Admin 相關

`POST /admin/election` : 創建選舉

  requestBody:

  ```json
  {
    "startDate": "2022-08-03T03:37:00Z", // 須為 iso String
    "endDate": "2022-08-03T03:37:00Z" // 須為iso String
  }
  ```

  response :

  ```json
  {
    "startDate": "2022-08-02T19:37:00.000Z",
    "endDate": "2022-08-02T19:42:00.000Z",
    "isActivated": false, //須超過兩位參賽者才會啟動
    "_id": "62e978f83ffad79323aee7b7",
    "createdAt": "2022-08-02T19:20:24.435Z",
    "updatedAt": "2022-08-02T19:20:24.435Z",
    "__v": 0
  }
  ```

`GET /admin/election` : 拿所有選舉 db 資訊
  response:

  ```json
  [
    {
        "_id": "62e7f47828d38f4bc85cedc4",
        "startDate": "2022-08-03T03:34:00.000Z",
        "endDate": "2022-08-03T03:49:00.000Z",
        "isActivated": true,
        "createdAt": "2022-08-01T15:42:48.812Z",
        "updatedAt": "2022-08-03T03:48:15.935Z",
        "__v": 0
    },
    {
      //...
      //...
    }
  ]
  ```

`GET /admin/:electionId` : 拿選舉 db 資訊

  request.params: `/user/62e974f51db1b3f499e706d8`

  response body:

  ```json
  {
    "startDate": "2022-08-02T19:37:00.000Z",
    "endDate": "2022-08-02T19:42:00.000Z",
    "isActivated": false,
    "_id": "62e978f83ffad79323aee7b7",
    "createdAt": "2022-08-02T19:20:24.435Z",
    "updatedAt": "2022-08-02T19:20:24.435Z",
    "__v": 0
  }
  ```

`PATCH /admin/election/:electionId` : 編輯選舉

  **這邊沒有做日期、選舉開始檢查，請小心使用！**

  request.params : `admin/election/62e7f47828d38f4bc85cedc4`

  requestBody:

  ```json
  {
    "startDate": "2022-08-03T11:34:00Z", //須為iso String
    "endDate": "2022-08-03T11:49:00Z", //須為iso String
    "isActivated":true
  }
  ```

  response body

  ```json
  {
    "_id": "62e7f47828d38f4bc85cedc4",
    "startDate": "2022-08-03T03:34:00.000Z",
    "endDate": "2022-08-03T03:49:00.000Z",
    "isActivated": true,
    "createdAt": "2022-08-01T15:42:48.812Z",
    "updatedAt": "2022-08-03T03:48:15.935Z",
    "__v": 0
  }
  ```

`POST /admin/candidate` : 新增選舉參選人

  request.body:

  ```json
  {
    "userId":"62e9f1d653420d3f6e48b6a2",
    "electionId":"62e7f47828d38f4bc85cedc4"
  }
  ```

  response:

  ```json
  {
    "_id": "62ea12b1a472c49861ae8dc7", // candidate collection _id
    "userId": "62e9f1d653420d3f6e48b6a2",
    "name": "瑞瑞4",
    "beVotedList": [],
    "electionId": "62e7f47828d38f4bc85cedc4",
    "createdAt": "2022-08-03T06:16:17.328Z",
    "updatedAt": "2022-08-03T06:16:17.328Z",
    "__v": 0
  }
  ```

`POST /admin/candidate/:candidateId` : 拿到選舉人資訊

  req.params 範例 :  `admin/candidate/62e7f43428d38f4bc85cedc2`

  requestBody:

  ```json
  {
    "electionId":"62e7f47828d38f4bc85cedc4",
    "page": 0 // <Number> 一頁顯示 10 筆該候選人的票倉
  }
  ```

  response:

  ```json
  [
    {
        "_id": "62e7f50e28d38f4bc85cedd0",
        "userId": "62e7f43428d38f4bc85cedc2",
        "name": "瑞瑞2",
        "electionId": "62e7f47828d38f4bc85cedc4",
        "beVotedCount": 1,
        "beVotedList": [  // 這裡一次只會顯示 10 筆
            "62e88b77fec2689bd8eca524" 
        ]
    }
  ]
  ```

## 遊戲流程

1. 啟動專案後，須先使用 admin 建立一筆選舉

   - 路由: `POST /admin/election`

2. 新增幾名 user

    - 路由: `POST /user`

3. admin 新增上一步驟所創建 user 參選
  
    - 路由: `POST /admin/candidate`
    - 注意！需要超過兩名參選者，系統才會自動生效選舉
    - 選舉生效並結束後，email 才有辦法寄出

4. user 投票給上ㄧ步驟有參選的使用者

    - 路由: `POST /user/vote`
    - 需要註冊成功後才能投票
    - 投過票的 user 才會收到選舉結果 email 通知

5. user 查看選舉戰況

     - 路由: `POST /user/candidateList`
     - 只有投過票的 user 才可以查看

6. 等待選舉結束收信
