<template>
  <div class="catalog">
    <ModalCreate @pushDate="addData" />
    <div class="catalog-wrapper">
      <Select @activeSelect="addIndex" />
      <Product
        class="product-item"
        v-for="(item, index) in formatData"
        :key="index"
        :description="item.description"
        :link="item.link"
        :name="item.name"
        :price="Number(item.price)"
        :index="index"
        @deleteProduct="deleteProduct"
      />
    </div>
    <transition name="loading">
      <div
        class="catalog-preloader"
        :class="{ 'm-active': isLoading }"
        v-show="isLoading"
        v-body-scroll-lock="isLoading"
      >
        <div class="catalog-preloader__box">
          <div class="catalog-preloader__circle">
            <div class="catalog-preloader__wrapper">
              <svg
                role="img"
                focusable="false"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 14 14"
              >
                <path
                  fill="#43a047"
                  d="M1.00000001 7.71134025l3.83505154 3.8041237 8.16494844-8.16494844-.86597938-.86597938L4.83505155 9.7835052 1.86597939 6.81443303z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ModalCreate from "@/components/modals/ModalCreate.vue";
import Product from "@/components/Product.vue";
import Select from "@/components/Select.vue";
import products from "@/mocks/products";

export default {
  name: "Catalog",
  components: {
    ModalCreate,
    Product,
    Select,
  },

  data() {
    return {
      products: products.products,
      localDataOfProduct: {
        name: "",
        description: "",
        link: "",
        price: "",
      },
      selected: "По умолчанию",
      index: false,
      scroll: true,
      isLoading: false,
    };
  },

  methods: {
    deleteProduct(index) {
      this.isLoading = true;
      setTimeout(() => {
        this.products.splice(index, 1);
        this.saveData();
      }, 1000);
    },
    addIndex: function (index) {
      this.index = index;
    },
    addData: function (data) {
      this.isLoading = true;
      setTimeout(() => {
        this.products.unshift(data);
        this.saveData();
      }, 1000);
    },

    sortMinMax: function (first, second) {
      if (first.price > second.price) return 1;
      if (first.price === second.price) return 0;
      if (first.price < second.price) return -1;
    },
    sortMaxMin: function (first, second) {
      if (first.price < second.price) return 1;
      if (first.price === second.price) return 0;
      if (first.price > second.price) return -1;
    },
    doSortMinMax: function () {
      this.products.sort(this.sortMinMax);
    },
    doSortMaxMin: function () {
      this.products.sort(this.sortMaxMin);
    },
    sortToName: function () {
      this.products.sort(function (a, b) {
        let nameA = a.name.toLowerCase(),
          nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    },
    commonSort() {
      this.products.sort(function (a, b) {
        let nameA = a.name,
          nameB = b.name;
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    },

    saveData() {
      const parsed = JSON.stringify(this.products);
      localStorage.setItem("products", parsed);
    },
  },

  computed: {
    formatData: function () {
      switch (this.index) {
        case 0:
          this.commonSort();
          return this.products;
        case 1:
          this.doSortMaxMin();
          return this.products;
        case 2:
          this.doSortMinMax();
          return this.products;
        case 3:
          this.sortToName();
          return this.products;
        default:
          return this.products;
      }
    },
  },

  watch: {
    selected: function () {
      if (this.selected === "Min-Max") {
        this.doSortMinMax();
      } else if (this.selected === "Max-Min") {
        this.doSortMaxMin();
      } else if (this.selected === "По умолчанию") {
        this.commonSort();
      }
    },

    isLoading: function () {
      if (this.isLoading === true) {
        setTimeout(() => (this.isLoading = false), 4000);
      }
    },
  },

  mounted() {
    if (localStorage.getItem("products")) {
      try {
        this.products = JSON.parse(localStorage.getItem("products"));
      } catch (e) {
        localStorage.removeItem("products");
      }
    }
    this.commonSort();
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  min-width: 330px;
}

.catalog {
  position: relative;
  padding: 32px 32px;
  display: flex;
  gap: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
}

.catalog-wrapper {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding-top: 52px;
  width: 100%;
  z-index: 0;

  @media (max-width: 1150px) {
    gap: 20px;
  }
  @media (max-width: 650px) {
    padding-top: 80px;
  }
}

.product-item {
  flex: 1 0 32%;
  min-height: 422px;
  max-width: 32%;

  @media (min-width: 1700px) {
    flex: 1 0 22%;
    max-width: 22%;
  }

  @media (max-width: 1211px) {
    max-width: 50%;
  }

  @media (max-width: 1150px) {
    max-width: 32%;
  }

  @media (max-width: 1063px) {
    max-width: 50%;
  }

  @media (max-width: 650px) {
    flex: 1 0 50%;
    max-width: none;
  }
}

.catalog-preloader {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #fff;

  &.m-active {
    svg {
      animation-name: hide;
    }

    .catalog-preloader__circle {
      animation-name: rotate;
    }
  }

  &__box {
    position: relative;
    box-sizing: border-box;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__circle,
  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid #7bae73;
    border-radius: 100%;
    transform-origin: center center;
    animation-duration: 2s;
    animation-timing-function: ease;
    animation-iteration-count: 2;
    animation-fill-mode: both;

    &::after {
      content: "";
      position: absolute;
      width: 20%;
      height: 20%;
      background-color: #fff;
    }
  }

  &__wrapper {
    width: 80%;
    height: 80%;

    &::after {
      top: 0;
      right: 0;
    }

    & svg {
      height: 70%;
      width: 70%;
      top: 50%;
      left: 50%;
      animation-duration: 3s;
      animation-delay: 2s;
      animation-timing-function: ease-out;
      animation-iteration-count: 1;
      animation-fill-mode: both;
      opacity: 1;
    }
  }

  &__circle {
    &::after {
      left: 0;
      bottom: 0;
    }
  }
}

.loading-enter-active {
  transition: all 0.3s ease;
}

.loading-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.loading-enter,
.loading-leave-to {
  filter: blur(0);
  opacity: 0;
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }
  50% {
    width: 10px;
    height: 10px;
  }
  to {
    transform: rotate(720deg);
  }
}

@keyframes hide {
  0%,
  30% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
