<template>
  <div class="select">
    <div class="select__header" @click="toggle">
      <p class="select__active">{{ active }}</p>
      <svg
        :class="{ 'm-rotate': isOpen }"
        width="8"
        height="6"
        viewBox="0 0 8 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.48532 1.24264L4.24268 4.48528L1.00003 1.24264"
          stroke="#B4B4B4"
        />
      </svg>
    </div>
    <ul class="select__list" v-show="isOpen">
      <li
        v-for="(item, index) in this.data"
        :key="index"
        class="select__item"
        @click="select(index)"
      >
        {{ item.filtration }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Select",
  props: {},

  data() {
    return {
      data: [
        { filtration: "По умолчанию" },
        { filtration: "Max-Min" },
        { filtration: "Min-Max" },
        { filtration: "A-Я" },
      ],
      isOpen: false,
      active: "По умолчанию",
    };
  },

  methods: {
    select: function (index) {
      this.active = this.data[index].filtration;
      this.toggle();
      this.$emit("activeSelect", index);
    },
    toggle: function () {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
.select {
  z-index: 1;
  min-width: 122px;
  position: absolute;
  top: 0;
  right: 0;
  box-sizing: border-box;
  border: none;
  background-color: #fffefb;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  & svg {
    position: absolute;
    right: 16px;
    transform-origin: center center;
    top: 50%;
    transform: translate(0, -50%);
    transition: transform 0.2s ease-out;

    &.m-rotate {
      transform: translate(0, -50%) rotate(180deg);
    }

    @media (max-width: 650px) {
      height: 16px;
      width: 24px;
    }
  }

  &__header {
    position: relative;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item,
  &__active {
    font-family: "Source Sans Pro", sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #b4b4b4;
    cursor: pointer;
    transition: opacity 0.2s ease-out;

    &:hover {
      opacity: 0.5;
    }

    @media (max-width: 650px) {
      font-size: 17px;
      line-height: 19px;
    }
  }

  &__item {
    padding: 10px 0 10px 16px;
  }

  &__active {
    margin: 0;
    padding: 10px 28px 10px 16px;

    @media (max-width: 650px) {
      padding: 20px 60px 20px 16px;
    }
  }
}
</style>
