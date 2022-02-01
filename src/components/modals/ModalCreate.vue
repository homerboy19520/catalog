<template>
  <div
    class="modalCreate-wrapper"
    :class="{ 'm-open': isOpen }"
    v-body-scroll-lock="isOpen"
  >
    <h2 class="modalCreate-title">Добавление товара</h2>
    <div class="modalCreate">
      <div class="modalCreate__box">
        <ModalInput
          v-for="(item, index) in inputData"
          :key="index"
          :description="item.description"
          :placeholder="item.placeholder"
          :isDescription="item.isDescription"
          :validation="item.validation"
          :index="index"
          :value="newData[index]"
          @pushData="addData"
        />
      </div>
      <button
        :disabled="isDisabled"
        class="modalCreate__button"
        :class="{ 'm-active': !isDisabled }"
        @click="createProduct"
      >
        Добавить товар
      </button>
    </div>
    <div
      class="modalCreate__mobile-button"
      :class="{ 'm-rotate': isOpen }"
      @click="toggle"
    >
      <svg
        class="modalCreate__icon"
        id="right-arrow-foward-sign"
        style="enable-background: new 0 0 15.698 8.706"
        viewBox="0 0 15.698 8.706"
        xml:space="preserve"
      >
        <polygon
          points="11.354,0 10.646,0.706 13.786,3.853 0,3.853 0,4.853 13.786,4.853 10.646,8 11.354,8.706 15.698,4.353 "
        />
      </svg>
    </div>
  </div>
</template>

<script>
import ModalInput from "@/components/ModalInput";

export default {
  name: "ModalCreate",
  components: { ModalInput },
  props: {
    modalData: {
      type: Array,
      require: true,
    },
  },

  data() {
    return {
      isOpen: false,

      newData: ["", "", "", ""],
      inputData: [
        {
          description: "Наименование товара",
          placeholder: "Введите наименование товара",
          validation: "space",
        },
        {
          description: "Описание товара",
          placeholder: "Введите описание товара",
          isDescription: true,
          validation: "description",
        },
        {
          description: "Ссылка на изображение товара",
          placeholder: "Введите ссылку",
          validation: "link",
        },
        {
          description: "Цена товара",
          placeholder: "Введите цену",
          validation: "number",
        },
      ],
    };
  },

  computed: {
    isDisabled: function () {
      return (
        this.newData.find((item, index) => item === "" && index !== 1) !==
        undefined
      );
    },
  },

  methods: {
    toggle: function () {
      this.isOpen = !this.isOpen;
    },

    addData: function (index, value) {
      this.newData.splice(index, 1, value);
    },

    createProduct: function () {
      if (!this.isDisabled) {
        let newData = {
          name: this.newData[0],
          description: this.newData[1],
          link: this.newData[2],
          price: this.newData[3],
        };
        this.$emit("pushDate", newData);
        this.isOpen = false;
        this.newData = ["", "", "", ""];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modalCreate-wrapper {
  max-width: 332px;
  min-width: 332px;
  box-sizing: border-box;
  height: 440px;
  width: 100%;
  transition: transform 0.2s ease-out;
  z-index: 2;

  @media (max-width: 1150px) {
    position: absolute;
    left: 0;
    top: 32px;
    transform: translate(-100%, 0);
    z-index: 1;
    background-color: #fff;
    height: calc(100vh - 130px);
    &.m-open {
      transform: translate(0);
      left: 32px;
    }
  }

  @media (max-width: 650px) {
    max-width: none;
    height: calc(100vh - 130px);

    &.m-open {
      transform: translate(0);
      left: 0;
    }
  }
}

.modalCreate-title {
  font-family: "Source Sans Pro", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 35px;
  color: #3f3f3f;
  margin: 0 0 16px 0;
  user-select: none;

  @media (max-width: 650px) {
    padding-left: 24px;
  }
}

.modalCreate {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: #fffefb;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.04), 0 6px 10px rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  z-index: 2;

  @media (max-width: 1150px) {
    height: 100%;
    justify-content: space-between;
  }

  @media (max-width: 650px) {
    z-index: 2;
    @media (max-height: 725px) {
      gap: 0;
      .modalCreate__box {
        gap: 0;
      }
    }
  }

  &__box {
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (max-width: 650px) {
      justify-content: space-around;
      gap: 20px;
    }
  }

  &__button {
    padding: 10px 0;
    background-color: #eeeeee;
    border: 1px solid transparent;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: #b4b4b4;
    transition: box-shadow 0.2s ease-out, color 0.2s ease-out,
      background-color 0.2s ease-out;
    cursor: not-allowed;

    &.m-active {
      background-color: #7bae73;
      color: #ffffff;
      cursor: pointer;

      &:hover {
        box-shadow: 0 7px 7px rgba(0, 0, 0, 0.1);
      }

      &:active {
        box-shadow: inset 0 7px 7px rgb(0 0 0 / 10%);
      }
    }

    @media (max-width: 650px) {
      padding: 16px 0;
    }
  }

  &__mobile-button {
    display: none;
    position: absolute;
    height: 30px;
    width: 30px;
    top: 0;
    right: -32px;
    transform: translate(100%, 0);
    transition: transform 0.2s ease-out;
    cursor: pointer;

    @media (max-width: 1150px) {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &.m-rotate {
      transform: scaleX(-1) translate(55px, 0);
    }
  }
}
</style>
