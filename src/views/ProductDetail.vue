<template>
  <div style="display:block;">
    <p class="show_categories">
      <span>
        <router-link to="/">IGSJ 스토어</router-link>
      </span>
      <span>
        <router-link to="#">
          대분류
        </router-link>
      </span>
      <span>
        <router-link to="#">
          중분류
        </router-link>
      </span>
    </p>
    <div class="aboutProduct">
      <div class="inner-product">
        <div class="img-box">
          <img id="productImage" :src="this.productInfo.image" :alt="this.productInfo.pno">
        </div>
        <div class="product-info">
          <div class="product-title">{{this.productInfo.product_name}}</div>
          <div class="explan_product product_info_section">
            <h4 class="title-box font-mss">
              Product Info
              <span class="korSub">&nbsp;<font size="2">제품정보</font></span>
            </h4>
            <ul class="product_article">
              <li>
                <p class="product_article_tit">품번</p>
                <p class="product_article_contents">
                  <strong>{{this.productInfo.pno}}</strong>
                </p>
              </li>
            </ul>
              </div>
              <div class="explan_product price_info_section">
                <h4 class="title-box font-mss">
                    Price Info
                    <span class="korSub">&nbsp;<font size="2">가격정보</font></span>
                </h4>
                <ul class="product_article">
                    <li class="box_info_products">
                      <p class="product_article_tit">IGSJ 판매가</p>
                      <p class="product_article_contents">
                          <span class="product_article_price" id="goods_price">
                            <span class="prouct-price">{{Number(this.productInfo.product_price).toLocaleString()}}원</span>
                          </span>
                      </p>
                    </li>
                </ul>
              </div>
              <div class="option-box">
                <select v-model="size">
                  <option value="">옵션 선택</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="2XL">2XL</option> 
                </select>
              </div>
              <div class="count-check" v-if="this.size!==''">
                <span>{{this.size}}</span>
                <input type="number" min="1" :max="this.productInfo.product_stock" v-model.number="count"/>
              </div>
              <div class="sum-total-price">
                <span>총 상품 금액</span>
                <span>{{totalPrice}}원</span>
              </div>
              <div class="btn-box">
                <button class="purchase"><b>바로구매</b></button>
                <button class="cart"><b>장바구니</b></button>
              </div>
          </div>
        </div>
    </div>
    <hr>
    <div class="info_detail">
      <h4 class="title-box font-mss">
        Info
        <span class="korSub">&nbsp;<font size="2">정보</font></span>
      </h4>
      <img :src="this.productInfo.image" :alt="this.productInfo.pno" style="width: 100%;" >
      <!-- 상품 정보 이미지는 추후에 작업 예정 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pno:'',
      productInfo: {},
      size: '',
      count: 1
    }
  },
  created(){
    this.pno = this.$route.params.pno
    this.fn_productInfo(this.pno)
  },
  computed: {
    totalPrice() {
      return (this.productInfo.product_price * this.count).toLocaleString()
    }
  },
  methods: {
    fn_productInfo(pno){
      this.$axios.get(this.$serverUrl + '/product/detail?pno=' + pno)
      .then((res) => {
        this.productInfo = res.data
        console.log(this.productInfo)
      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('Error')
        }
      })
    }
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Noto+Sans+KR:wght@100;300;400;500;700&display=swap');
  * {/* 구글 폰트 웹사이트 전체 적용 */
    font-family: 'Nanum Pen Script', cursive;
    font-family: 'Noto Sans', sans-serif;
    font-family: 'Noto Sans KR', sans-serif;
  }
  .show_categories {
    border-bottom: 1px solid darkgrey;
    padding: 6px 0;
    margin: 0;
  }
  .show_categories span {
    font-size: 12px;
    font-weight: bold;
  }
  .show_categories span::after {
    content: ' > ';
    font-weight: 100;
  }
  .show_categories span:first-child {
    margin-left: 10px;
  }
  .show_categories span:last-child::after {
    content: '';
  }
  .show_categories a {
    text-decoration: none;
    color: black;
  }
  .show_categories a:hover {
    text-decoration: underline;
  }
  .inner-product {
    display: flex;
    padding: 20px;
    align-items: center;
    height: 100%;
  }
  .img-box {
    display : flex;
    align-items : center;
    justify-content : center;
    width: 350px;
    min-width: 350px;
    height: 450px;
    border: 1px solid #bebebe;
  }
  #productImage {
    border: 1px solid #e9e9e9;
    width: 325px;
    height: 425px;
  }
  .product-info {
    width: 350px;
    min-width: 350px;
    height: 450px;
    margin: 0px;
    margin-left: 36px;
  }
  .product-title {
    border-bottom: 1px solid lightgrey;
    width: 100%;
    padding: 10px 0px;
    padding-left: 0px;
    margin-bottom: 10px;
    font-size: 20px;
  }
  ul {
    list-style: none;
    padding:0px;
  }
  .korSub{
    color: #b4b4b4;
  }
  .product_article_tit {
    display: inline-block;
    width: 120px;
  }
  .product_article_contents {
    display: inline-block;
  }
  .btn-box{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
  }
  .purchase {
    width: 70%;
    height: 100%;
    border: none;
    font-size: 20px;
    cursor: pointer;
    background: #000000;
    color: #FFFFFF;
  }
  .cart{
    width: 28%;
    height: 100%;
    border: none;
    font-size: 20px;
    cursor: pointer;
    border: 1px solid darkgrey;
    background: white;
    color: darkgrey;
  }
  .option-box {
    width:100%;
    height:50px;
    background:lightgrey;
    border: 1px solid lightgrey;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .option-box select{
    width:310px;
    text-align:left;
  }
  .count-check {
    width: 100%;
    height: 50px;
    padding: 10px;
    background: white;
    border: 1px solid lightgrey;
    border-bottom: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .count-check span {
    width:70px;
    text-align:center;
  }
  .count-check input {
    width:60px;
    padding-left:20px;
  }
  .sum-total-price {
    width: 100%;
    height: 50px;
    padding: 10px;
    background: white;
    border: 1px solid lightgrey;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  hr {
    margin: 20px 0;
    color:grey;
  }
  .info_detail {
    width: 736px;
    margin-left: 50px;
    margin-bottom: 50px;
  }           
</style>