# Dream - Backend

**위코드 44기 2차 프로젝트 <br>
c2c 명품 경매 플랫폼 KREAM을 모델링하여 레고 상품 c2c 경매 플랫폼 웹사이트 제작<br>
[결과물 시연 영상 링크](https://www.youtube.com/watch?v=UFuS91VcVp8)**

> **짧은 프로젝트 기간동안 개발에 집중해야 하므로 디자인/기획 부분만 클론했습니다.<br>
개발은 초기 세팅부터 전부 직접 구현했으며, 아래 데모 영상에서 보이는 부분은 모두 백앤드와 연결하여 실제 사용할 수 있는 서비스 수준으로 개발한 것입니다.*


## 1. 프로젝트 기간 & 인원
* 프로젝트 기간: 2주 (2023.04.20 ~ 2023.05.04)   
* 개발 인원:  
  `Frontend`: 최선영(Product Manager), 김영운, 조건호 <br>
  `Backend`: 박세익(Project Manager), 장다희, 김민서, 송석준 <br>
* [프론트엔드 Github 저장소](https://github.com/wecode-bootcamp-korea/44-2nd-Dream-frontend)
* 모델링한 사이트: [KREAM](https://kream.co.kr/)

<br>


## 2. 사용 기술

* **BackEnd** <br>

   JavaScript <br>
   Node.js v16.15 <br>
   express 4.18 <br>
   Jest 29.5 <br>
   MySql 5.7 <br>
   Rest <br>
   Prettier <br>
   Docker <br>
   AWS <br>
 
<br>

* **협업** <br>

  Git & Git hub <br>
  Trello <br>
  Postman <br>
  Slack <br>
  Notion <br>

<br>


 ## 3. [ERD](https://dbdiagram.io/d/64426bdf6b31947051f9b394)
 User가 구매자이자 판매자가 될 수 있으며, 하나의 Product에 구매 입찰과 판매 입찰이 동시에 이루어진다는 점에 주안점을 두고 데이터베이스 모델을 구축하였습니다. <br><br>
![DREAM (3)](https://github.com/wecode-bootcamp-korea/44-2nd-Dream-backend/assets/120387100/b18561e6-0888-4aaa-8eaa-452122d73e11)

 
 ## 4. 핵심 기능
 
 c2c 경매 플랫폼으로서 갖추어야 할 필수 기능들을 구현 하였습니다.
 
<details>
<summary>핵심 기능 설명 펼치기</summary>
<div markdown="1">
 
<br>
  
 **1. 회원가입/로그인(Kakao Social Login)** 📌[코드 확인](https://github.com/walwald/44-2nd-Dream-backend/blob/669cc7d2ba9331583cc76f30c1f8cf3e2cda6e40/API/services/userService.js#L6)
 - KaKao에서 제공하는 API를 활용하여 user 회원 가입, 로그인 기능을 구현했습니다.
 
 <br>
 
**2. 상품 리스트 (필터/정렬)** 📌[코드 확인](https://github.com/walwald/44-2nd-Dream-backend/blob/669cc7d2ba9331583cc76f30c1f8cf3e2cda6e40/API/models/productDao.js#L57)
  
- query parameter로 필터 및 정렬 조건을 전달 받아, 그에 따라 상품 리스트를 응답하는 API입니다.
- 좋아요 많은 순, 즉시 구매가 순, 즉시 판매가 순, 리뷰 순, 프리미엄 가격 순으로 정렬이 가능합니다.
- 상품 카테고리, 사용 연령, 난이도로 필터 가능합니다.

<br>

**3. 상품 상세 정보** 📌[코드 확인](https://github.com/walwald/44-2nd-Dream-backend/blob/669cc7d2ba9331583cc76f30c1f8cf3e2cda6e40/API/services/productService.js#L5)

- path parameter로 productId를 전달 받아, 해당하는 product의 상세 정보를 응답하는 API입니다.
- 상품명, 모델넘버, 카테고리, 좋아요 수 등 기본 정보 뿐만 아니라, 즉시 구매가, 즉시 판매가, 최근 거래가, 프리미엄 퍼센트 등의 경매가 관련 데이터도 함께 전달합니다.
- `즉시 구매가`는 판매 입찰된 금액 중 가장 낮은 금액, `즉시 판매가`는 구매 입찰된 금액 중 가장 높은 금액, `최근 거래가`는 체결 거래 중 가장 최신 거래의 거래 성사 가격입니다.
- `프리미엄 퍼센트`는 상품 발매가와 최근 거래가의 비율로 계산됩니다.

<br>

**4. 입찰** 📌[코드 확인](https://github.com/walwald/44-2nd-Dream-backend/blob/a51ad73eea353c5395936e41337ced2c525ba9d9/API/models/bidDao.js#L126)

- `상품 productId`, `구매/판매 중 해당하는 입찰 유형`, `입찰 금액`, `입찰 마감 기한`을 request의 body로 전달받아 입찰 내역이 기록되는 API입니다.
- `구매 입찰`, `즉시 구매`, `판매 입찰`, `즉시 판매` 네 가지 경우에 모두 사용할 수 있습니다.
- userId는 token의 payload에 저장된 정보를 이용합니다.
- 입찰 금액에 따라 즉시 거래가 성사 될 수 있습니다.
- 즉시 거래가 성사되는 경우, transaction을 사용하여 `거래 건 생성`, `입찰 상태를 낙찰로 변경`, `거래 상대방의 입찰 내역도 낙찰 상태로 변경` 등의 처리가 동시에 이루어지도록 했습니다.
- 해당 user와 상품에 대해 기존 입찰 내역이 존재할 경우 '금액' 혹은 '입찰 기한'이 변경되도록 하여, 입찰 건 생성 외에도 입찰 내역 업데이트에 본 API가 사용될 수 있습니다.
<br>
 
**5. 입찰 상세 내역 조회** 📌[코드 확인](https://github.com/walwald/44-2nd-Dream-backend/blob/a51ad73eea353c5395936e41337ced2c525ba9d9/API/services/bidService.js#L36)

- 입찰 금액 및 기한 입력 후 이어지는 개인 정보 입력 페이지에서 입찰 내역 확인을 위한 입찰 상세 정보 조회 API입니다.
- path parameter로 상품의 productId를, query parameter로 구매/판매 등의 입찰 유형을 전달 받습니다. userId는 token의 payload에 저장된 정보를 이용합니다.
- 거래 성사 여부에 따라 dealId(거래 Id)와 dealNumber(고유 거래 번호) 전달 여부가 달라집니다. 거래가 성사되지 않고 입찰만 완료된 경우 두 값을 null로 전달합니다.
- 상품에 대한 기본 정보와, 입찰 건의 Id, 입찰 금액, 입찰 기한, 수수료 금액 등을 전달합니다.
 
 
 <br>

 **6. 상품 검색** 📌[코드 확인](https://github.com/walwald/44-2nd-Dream-backend/blob/a6898307b9601db0e41209f16a1fce26dc5efea4/API/models/searchDao.js#L4)
 
 - keyword에 상품명 또는 basic, building, movie, car 등의 카테고리 명 기입 시 검색됩니다.
 
  <br>
  
 **7. 인기 검색어**
 - 누적 인기검색어를 조회하는 API입니다.
 - 검색 시 키워드별 검색량이 누적됩니다. 📌[코드 확인](https://github.com/walwald/44-2nd-Dream-backend/blob/a6898307b9601db0e41209f16a1fce26dc5efea4/API/models/searchDao.js#L32)
 - 검색어 데이터를 역대 검색량 순으로 정렬하여 상위 10개의 검색어를 응답합니다. 📌[코드 확인](https://github.com/walwald/44-2nd-Dream-backend/blob/a6898307b9601db0e41209f16a1fce26dc5efea4/API/models/searchDao.js#L48)

  <br>
  
**8. 관심상품 등록/삭제** 📌[코드 확인](https://github.com/walwald/44-2nd-Dream-backend/blob/a6898307b9601db0e41209f16a1fce26dc5efea4/API/services/likeService.js#L3)
- path parameter로 productId를 받아 해당 유저의 관심상품으로 등록합니다.
- 동일한 product와 동일한 user에 대해 API가 재실행될 경우 관심상품에서 삭제합니다.
  
  <br>

 **9. 리뷰 CRUD**
 
 - 생성: multer-3와 multer를 이용하여 서버 측에서 AWS의 S3에 사진을 올려 사진 리뷰 게시가 가능하도록 했습니다. 📌[코드 확인](https://github.com/walwald/44-2nd-Dream-backend/blob/a6898307b9601db0e41209f16a1fce26dc5efea4/API/routes/reviewRouter.js#L9)
 - 조회: 리뷰 조회 시 productId를 사용하여 데이터베이스에서 제품에 대한 리뷰를 검색합니다. users 및 review_images 테이블과 LEFT JOIN 하여 데이터를 반환합니다. 📌[코드 확인](https://github.com/walwald/44-2nd-Dream-backend/blob/a6898307b9601db0e41209f16a1fce26dc5efea4/API/models/reviewDao.js#L5)
 - 수정: 유효한 reviewId인지 확인 후 리뷰가 수정되도록 했습니다. 📌[코드 확인](https://github.com/walwald/44-2nd-Dream-backend/blob/a6898307b9601db0e41209f16a1fce26dc5efea4/API/services/reviewService.js#L24)
 - 삭제: 리뷰와 리뷰 이미지 삭제에 대해 transaction 처리 하였습니다. 📌[코드 확인](https://github.com/walwald/44-2nd-Dream-backend/blob/a6898307b9601db0e41209f16a1fce26dc5efea4/API/models/reviewDao.js#L64)

  <br>
  
  **10. 결제/정산 완료 상태 업데이트** 📌코드 확인 - [판매](https://github.com/walwald/44-2nd-Dream-backend/blob/a6898307b9601db0e41209f16a1fce26dc5efea4/API/models/paymentDao.js#L100), [구매](https://github.com/walwald/44-2nd-Dream-backend/blob/a6898307b9601db0e41209f16a1fce26dc5efea4/API/models/paymentDao.js#L169)
  - 즉시 구매 후 client가 결제 완료 요청을 보내면, 거래 상태를 `결제 완료`로 업데이트합니다. 
  - 즉시 판매가 체결되면 구매자의 `결제 대기`로 상태를 업데이트 합니다.
  
<br>
  
  </div>
</details>

- [Postman](https://documenter.getpostman.com/view/26858291/2s93eWzskR): 프로젝트 진행 시 Postman의 Documentation을 활용하여 프론트엔드와 소통하였습니다.
client가 사용한 모든 API를 Postman에서 확인할 수 있습니다.

<br>

 ## 5. 핵심 트러블 슈팅
 #### 1. 상품 상세 정보 호출 API - SELECT 쿼리문의 오사용
 - 상품 상제 정보 호출 API 작성 후 API가 잘 실행되는지 확인하는 과정에서 각 테이블에 데이터를 1개씩만 생성하고 테스트하여, SELECT 문 내 suq-query가 2개 이상의 row를 반환한다는 사실을 발견하지 못했습니다.
 
    <details>
    <summary>기존 코드</summary>
    <div markdown="1">

    ```JavaScript
    //API/models/productDao.js
    const productDetail = async (productId) => {
      try {
        const [productDetail] = await appDataSource.query(
          `
            SELECT 
                p.name productName,
                p.model_number modelNumber,
                c.name categoryName,
                p.original_price originalPrice,
                pi.url imageUrl,
                pa.age productAge,
                pl.level productLevel,
                (SELECT 
                    b.bid_price
                FROM buyings b
                JOIN deals d
                ON d.buying_id = b.id
                WHERE d.created_at = (SELECT max(created_at) FROM deals)) recentDealPrice,
                (SELECT 
                    bid_price
                FROM sellings
                WHERE bid_price = (SELECT min(bid_price) FROM sellings WHERE bid_status_id = 1)) buyNowPrice,
                (SELECT 
                    bid_price
                FROM buyings
                WHERE bid_price = (SELECT max(bid_price) FROM buyings WHERE bid_status_id = 1)) sellNowPrice,
                (SELECT 
                  COUNT(user_id)
                FROM likes
                GROUP BY product_id) likeCount
            FROM products p
            JOIN categories c ON p.category_id = c.id
            JOIN product_images pi ON p.id = pi.product_id
            JOIN product_ages pa ON p.product_age_id = pa.id
            JOIN product_levels pl ON p.product_level_id = pl.id
            LEFT JOIN buyings b ON b.product_id = p.id
            LEFT JOIN sellings s ON s.product_id = p.id
            LEFT JOIN likes l ON l.product_id = p.id
            WHERE p.id = ?
        `,
          [productId]
        );
        return productDetail;
      } catch (err) {
        err.message = 'DATABASE_ERROR';
        err.statusCode = 400;
        throw err;
      }
    };
    ```
    </div>
    </details>

- github push 후 에러를 인지하고, query문의 구조를 수정하였습니다.
- '최근 거래가(recent deal price)','즉시 구매가(buy now price)', '즉시 판매가(sell now price)'의 경우 재활용성을 고려하여 별도의 함수로 분리시켰습니다.
- API를 작성할 때에는 반드시 다양한 환경에서 테스트를 해야 한다는 사실을 깨달았습니다.


  <details>
  <summary>수정된 코드</summary>
  <div markdown="1">

  - 상품 상세 정보 호출 함수 ('최근 거래가(recent deal price)','즉시 구매가(buy now price)', '즉시 판매가(sell now price)' 제외)

  ```JavaScript
  //API/models/productDao.js
  //3가지 금액 정보를 제외한 상품 디테일 정보 호출 함수 최종 ver.

  const productDetail = async (productId) => {
    try {
      const [productDetail] = await appDataSource.query(
        `
          SELECT 
              p.id productId,
              p.name productName,
              p.model_number modelNumber,
              c.name categoryName,
              p.original_price originalPrice,
              pi.url imageUrl,
              pa.age productAge,
              pl.level productLevel,
              l.likeCount
          FROM products p
          JOIN categories c ON p.category_id = c.id
          JOIN product_images pi ON p.id = pi.product_id
          JOIN product_ages pa ON p.product_age_id = pa.id
          JOIN product_levels pl ON p.product_level_id = pl.id
          LEFT JOIN (SELECT 
              product_id,
              COUNT(id) likeCount
           FROM likes
           GROUP BY product_id) l ON l.product_id = p.id
          WHERE p.id = ?
                `,
        [productId]
      );
      return productDetail;
    } catch (err) {
      throw new DatabaseError('DATABASE_ERROR');
    }
  };

  ```
  <br>

  - '최근 거래가(recent deal price)','즉시 구매가(buy now price)', '즉시 판매가(sell now price)' 도출 메서드

  ```JavaScript
  //API/models/bidDao.js
  const appDataSource = require('./appDataSource');
  const { bidStatusEnum } = require('./enum');
  const { DatabaseError } = require('../utils/error');

  class BidCase {
    constructor(productId, bidType, bidPrice) {
      this.bidType = bidType;
      this.bidPrice = bidPrice;
      this.productId = productId;
      this.counterpart = bidType == 'buying' ? 'selling' : 'buying';
      this.commissionRate = bidType == 'buying' ? 0.02 : 0.05;
      this.table = `${bidType}s`;
      this.counterTable = `${this.counterpart}s`;
      this.minOrMax = this.counterpart == 'selling' ? 'min' : 'max';
      this.appDataSource = appDataSource;
    }

   async nowPriceSetter(productIdValue, table, minOrMax) {
      try {
        const [bidPrice] = await this.appDataSource.query(
          ` 
          SELECT 
              bid_price bidPrice
          FROM ${table}
          WHERE bid_price = (
            SELECT ${minOrMax}(bid_price) 
            FROM ${table} 
            WHERE bid_status_id = ${bidStatusEnum.bid} 
            AND product_id = ${productIdValue}) 
          `
        );

        if (bidPrice == undefined) {
          return null;
        }

        return parseFloat(Object.values(bidPrice));
      } catch (err) {
        throw new DatabaseError('DATABASE_ERROR');
      }
    }

    getBuyNowPrice() {
      return this.nowPriceSetter(this.productId, 'sellings', 'min');
    }

    getSellNowPrice() {
      return this.nowPriceSetter(this.productId, 'buyings', 'max');
    }

    async getNowPrice() {
      return this.nowPriceSetter(
        this.productId,
        this.counterTable,
        this.minOrMax
      );
    }

    async getRecentDealPrice() {
      try {
        const [bidPrice] = await this.appDataSource.query(
          ` 
              SELECT 
                  b.bid_price AS bidPrice
              FROM deals d
              JOIN buyings b ON b.id = d.buying_id
              WHERE d.created_at = 
              (SELECT max(d.created_at) 
              FROM deals 
              JOIN buyings b ON b.id = d.buying_id 
              WHERE b.product_id = ${this.productId}) 
              AND b.product_id = ${this.productId}
              ORDER BY d.created_at DESC
              `
        );

        if (bidPrice == undefined) {
          return null;
        }

        return parseFloat(Object.values(bidPrice));
      } catch (err) {
        throw new DatabaseError('DATABASE_ERROR');
      }
    }
   };
  ```
  <br>

  - 정보를 하나의 객체로 합하여 전달하는 producService 내 함수

  ```JavaScript
  //API/services/productService.js
  const productDao = require('../models/productDao');
  const { BaseError } = require('../utils/error');
  const { BidCase } = require('../models/bidDao');

  const getProductDetail = async (productId) => {
    const checkProductId = await productDao.isExistingProduct(productId);

    if (!checkProductId) {
      throw new BaseError('PRODUCT_DOES_NOT_EXIST', 404);
    }

    const productDetail = await productDao.productDetail(productId);
    const bidCase = new BidCase(productId);

    productDetail.buyNowPrice = await bidCase.getBuyNowPrice();
    productDetail.sellNowPrice = await bidCase.getSellNowPrice();
    productDetail.recentDealPrice = await bidCase.getRecentDealPrice();
    productDetail.recentDealPrice == null
      ? (productDetail.premiumPercent = null)
      : (productDetail.premiumPercent = (
          ((productDetail.recentDealPrice - productDetail.originalPrice) /
            productDetail.originalPrice) *
          100
        ).toFixed(1));

    return productDetail;
  };
  ```
  </div>
  </details>
  
  <br>
  
 #### 2. 경매 입찰 API - API class화
 - '구매 입찰'과 '판매 입찰'을 모두 처리할 수 있는 하나의 API를 작성하고자 했습니다.
 - 처음에는 함수와 객체를 활용하여 경우에 따라 적절한 값을 객체의 property에서 불러와 함수의 인자로 사용하고자 했습니다.
 - 그러나 각 경우에 따라 달라져야 하는 변수의 수가 많아, 다수의 객체를 참조하게 되면서 코드의 가독성이 떨어지고 복잡성이 높아진다고 판단하였습니다.
 - 이에 대해 고안해낸 방법은 class를 활용하여 property와 메서드를 한 번에 활용하는 것이었습니다.
    <details>
    <summary>작성한 코드</summary>
    <div markdown="1">
      
      - bidDao 내 입찰 관련 로직을 처리하는 class
      
      ```JavaScript
      //API/models/bidDao.js

      class BidCase {
        constructor(productId, bidType, bidPrice = null, dueDate = null, userId) {
          this.bidType = bidType;
          this.bidPrice = bidPrice;
          this.productId = productId;
          this.counterpart = bidType == 'buying' ? 'selling' : 'buying';
          this.commissionRate = bidType == 'buying' ? 0.02 : 0.05;
          this.counterCommissionRate = bidType == 'buying' ? 0.05 : 0.02;
          this.table = `${bidType}s`;
          this.counterTable = `${this.counterpart}s`;
          this.minOrMax = this.counterpart == 'selling' ? 'min' : 'max';
          this.dueDate = dueDate;
          this.userId = userId;
          this.appDataSource = appDataSource;
        }

        async nowPriceSetter(productIdValue, table, minOrMax) {
          try {
            const [bidPrice] = await this.appDataSource.query(
              ` 
              SELECT 
                  bid_price bidPrice
              FROM ${table}
              WHERE bid_price = (
                SELECT ${minOrMax}(bid_price) 
                FROM ${table} 
                WHERE bid_status_id = ${bidStatusEnum.bid} 
                AND product_id = ${productIdValue}) 
              `
            );

            if (bidPrice == undefined) {
              return null;
            }

            return parseFloat(Object.values(bidPrice));
          } catch (err) {
            throw new DatabaseError('DATABASE_ERROR');
          }
        }

        getBuyNowPrice() {
          return this.nowPriceSetter(this.productId, 'sellings', 'min');
        }

        getSellNowPrice() {
          return this.nowPriceSetter(this.productId, 'buyings', 'max');
        }

        async getNowPrice() {
          return this.nowPriceSetter(
            this.productId,
            this.counterTable,
            this.minOrMax
          );
        }

        async getRecentDealPrice() {
          try {
            const [bidPrice] = await this.appDataSource.query(
              ` 
                  SELECT 
                      b.bid_price AS bidPrice
                  FROM deals d
                  JOIN buyings b ON b.id = d.buying_id
                  WHERE d.created_at = 
                  (SELECT max(d.created_at) 
                  FROM deals 
                  JOIN buyings b ON b.id = d.buying_id 
                  WHERE b.product_id = ${this.productId}) 
                  AND b.product_id = ${this.productId}
                  ORDER BY d.created_at DESC
                  `
            );

            if (bidPrice == undefined) {
              return null;
            }

            return parseFloat(Object.values(bidPrice));
          } catch (err) {
            throw new DatabaseError('DATABASE_ERROR');
          }
        }

        async isNowPrice() {
          const nowPrice = await this.getNowPrice();
          if (
            nowPrice &&
            ((this.bidType == 'buying' && this.bidPrice - nowPrice >= 0) ||
              (this.bidType == 'selling' && this.bidPrice - nowPrice <= 0))
          ) {
            this.bidPrice = nowPrice;

            return this.bidPrice;
          }

          return false;
        }

        async isExistingBid() {
          try {
            const [result] = await appDataSource.query(
              `SELECT EXISTS (
                  SELECT
                  id
                  FROM ${this.table}
                  WHERE user_id = ${this.userId} 
                  AND product_id = ${this.productId} 
                  AND bid_status_id = ${bidStatusEnum.bid}
                  ) existing 
                  `
            );
            return !!parseInt(result.existing);
          } catch (err) {
            throw new DatabaseError('DATABASE_ERROR');
          }
        }

        async biddingIn() {
          const queryRunner = this.appDataSource.createQueryRunner();
          await queryRunner.connect();
          await queryRunner.startTransaction();
          try {
            await this.isNowPrice();
            if (await this.isExistingBid()) {
              await queryRunner.query(
                `UPDATE ${this.table}
              SET bid_price = ?,
                  due_date = ?
              WHERE user_id = ? 
              AND product_id = ? 
              AND bid_status_id = ?`,
                [
                  this.bidPrice,
                  this.dueDate,
                  this.userId,
                  this.productId,
                  bidStatusEnum.bid,
                ]
              );

              const [bidding] = await queryRunner.query(
                `SELECT
                  id
              FROM ${this.table}
              WHERE user_id = ${this.userId} 
              AND product_id = ${this.productId} 
              AND bid_status_id = ${bidStatusEnum.bid}
              `
              );
              this.biddingId = bidding.id;
            } else {
              const bidding = await queryRunner.query(
                ` INSERT INTO ${this.table} (
                      product_id,
                      bid_price,
                      due_date,
                      user_id
                      )
                      VALUES (?, ?, ?, ?)`,
                [this.productId, this.bidPrice, this.dueDate, this.userId]
              );

              this.biddingId = bidding.insertId;
            }

            if (!(await this.isNowPrice())) {
              await queryRunner.commitTransaction();
              return;
            }

            const [partner] = await queryRunner.query(
              `SELECT
              id,
              user_id userId 
              FROM ${this.counterTable}
              WHERE updated_at = 
              (SELECT 
                  min(updated_at)
              FROM ${this.counterTable}
              WHERE product_id = ${this.productId} 
              AND bid_price = ${this.bidPrice} 
              AND bid_status_id = ${bidStatusEnum.bid})
              AND product_id = ${this.productId} 
              AND bid_price = ${this.bidPrice} 
              AND bid_status_id = ${bidStatusEnum.bid}
              ORDER BY updated_at`
            );

            if (partner.userId == this.userId) {
              throw new DatabaseError('SAME_USER_WITH_COUNTERPART');
            }

            await queryRunner.query(
              `UPDATE ${this.table} t
              JOIN ${this.counterTable} c
              SET t.bid_status_id = ${bidStatusEnum.deal},
                  c.bid_status_id = ${bidStatusEnum.deal}
              WHERE t.id = ${this.biddingId} 
              AND c.id = ${partner.id}`
            );

            const dealInput = await queryRunner.query(
              ` INSERT INTO deals (
                  ${this.bidType + '_id'},
                  ${this.counterpart + '_id'},
                  ${this.bidType + '_commission'},
                  ${this.counterpart + '_commission'}
                  )
                  VALUES (?, ?, ?, ?)`,
              [
                this.biddingId,
                partner.id,
                this.commissionRate * this.bidPrice,
                this.counterCommissionRate * this.bidPrice,
              ]
            );

            [this.dealInfo] = await queryRunner.query(
              `
              SELECT
                  id,
                  deal_number dealNumber
              FROM deals
              WHERE id = ?`,
              [dealInput.insertId]
            );

            await queryRunner.commitTransaction();

            return;
          } catch (err) {
            await queryRunner.rollbackTransaction();
            err.message = err.message || 'DATABASE_ERROR';
            err.statusCode = 400;
            throw err;
          } finally {
            await queryRunner.release();
          }
        }
      ```
      - bidDao의 class를 실행시키는 bidService
                                                                          
      ```JavaScript
      //API/services/bidService.js
      const inputBidPrice = async (productId, bidType, bidPrice, dueDate, userId) => {
        const bidCase = new BidCase(productId, bidType, bidPrice, dueDate, userId);

        return await bidCase.biddingIn();
      };
      ``` 
    </div>
    </details>
    
  - class를 깊이 학습하는 계기가 되었습니다.
  
<br>

 ## 6. 느낀점/회고
 > 2차 프로젝트 회고록: https://walwaldev.tistory.com/57

  <br>
  
 ## Reference

- 이 프로젝트는 [KREAM](https://kream.co.kr/) 사이트를 참조하여 학습목적으로 만들었습니다.
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
- 이 프로젝트에서 사용하고 있는 사진 대부분은 위코드에서 구매한 것이므로 해당 프로젝트 외부인이 사용할 수 없습니다.
