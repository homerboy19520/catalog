<template>
  <div class="modalInput" :class="{ 'm-description': isDescription }">
    <span class="modalInput__text">{{ description }} </span>
    <input
      class="modalInput__input"
      :class="{ 'm-valid': isValid, 'm-error': isValid === false }"
      v-bind:type="type"
      :placeholder="placeholder"
      v-model="valueLocal"
    />
    <textarea
      v-show="isDescription"
      class="modalInput__textaria"
      :placeholder="placeholder"
      v-model="valueLocal"
    ></textarea>
    <span
      class="modalInput__text-eror"
      :class="{ 'm-show': isValid === false }"
    >
      Поле является обязательным</span
    >
  </div>
</template>

<script>
export default {
  name: "modalInput",
  props: {
    value: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    isDescription: {
      type: Boolean,
    },
    index: {
      type: Number,
      required: true,
    },
    validation: {
      type: String,
    },
  },

  data() {
    return {
      valueLocal: "",
      isValid: "",
    };
  },

  computed: {
    type() {
      if (this.validation === "number") return "number";
      return "text";
    },
  },

  watch: {
    value() {
      this.valueLocal = this.value;
    },

    valueLocal: function () {
      this.isValid = "";
      if (
        (this.validation === "space" &&
          this.spaceValidation(this.valueLocal) === true) ||
        this.validation === "description" ||
        (this.validation === "link" && this.validationLink(this.valueLocal)) ===
          true
      ) {
        this.isValid = true;
        this.pushData(this.index, this.valueLocal);
      } else if (
        this.validation === "number" &&
        this.spaceValidation(this.valueLocal) === true
      ) {
        this.isValid = true;
        this.pushData(this.index, this.valueLocal);
      } else if (this.validation === "") {
        this.isValid = "";
      } else {
        this.isValid = false;
        setTimeout(() => (this.isValid = ""), 2000);
        this.pushData(this.index, "");
      }
    },
  },

  methods: {
    validationLink: function (str) {
      let pattern = new RegExp(
        "^(https?:\\/\\/)?" +
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
          "((\\d{1,3}\\.){3}\\d{1,3}))" +
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
          "(\\?[;&a-z\\d%_.~+=-]*)?" +
          "(\\#[-a-z\\d_]*)?$",
        "i"
      );
      return !!pattern.test(str);
    },

    spaceValidation: function (str) {
      let name = str.replace(/\s+/g, "");
      return name !== "";
    },

    pushData: function (index, valueLocal) {
      this.$emit("pushData", index, valueLocal);
    },
  },

  mounted() {
    this.valueLocal = this.value;
  },
};
</script>

<style lang="scss" scoped>
.modalInput {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-family: "Source Sans Pro", sans-serif;
  width: 100%;
  @media (max-width: 650px) {
    gap: 15px;
  }

  &.m-description {
    input {
      display: none;
    }

    span::after {
      display: none;
    }
  }

  &__text {
    position: relative;
    width: fit-content;
    font-size: 10px;
    line-height: 13px;
    letter-spacing: -0.02em;
    color: #49485e;

    @media (max-width: 650px) {
      font-size: 19px;
      line-height: 22px;
    }

    &_description::after {
      display: none;
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(100%, 0);
      width: 4px;
      height: 4px;
      background-color: #ff8484;
      border-radius: 50%;
      @media (max-width: 650px) {
        width: 6px;
        height: 6px;
      }
    }
  }

  &__input,
  &__textaria {
    font-family: "Source Sans Pro", sans-serif;
    box-sizing: border-box;
    width: 100%;
    height: 36px;
    padding: 10px 16px 11px 16px;
    border: 1px solid transparent;
    border-radius: 4px;
    background-color: #fffefb;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    outline: none;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #3f3f3f;
    transition: border-color 0.2s ease-out, box-shadow 0.2s ease-out;

    &::placeholder {
      text-align: left;
      font-family: "Source Sans Pro", sans-serif;
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      color: #b4b4b4;
      transition: opacity 0.2s ease-out;

      @media (max-width: 650px) {
        font-size: 17px;
        line-height: 20px;
        height: 50px;
      }
    }

    &:focus::placeholder {
      opacity: 0;
    }

    &.m-error {
      border-color: #ff8484;
    }

    &.m-valid {
      border-color: #7bae73;
    }

    &:hover {
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 650px) {
      font-size: 19px;
      line-height: 22px;
    }
  }

  &__input {
    @media (max-width: 650px) {
      height: 50px;
    }
  }

  &__textaria {
    width: 100%;
    min-height: 108px;
    resize: none;
  }

  &__text-eror {
    position: absolute;
    bottom: -4px;
    left: 0;
    transform: translate(0, 100%);
    font-weight: 400;
    font-size: 8px;
    line-height: 10px;
    letter-spacing: -0.02em;
    color: #ff8484;
    opacity: 0;
    transition: opacity 0.2s ease-out;

    &.m-show {
      opacity: 1;
    }

    @media (max-width: 650px) {
      font-size: 15px;
      line-height: 17px;
    }
  }

  & input[type="number"]::-webkit-outer-spin-button,
  & input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  & input[type="number"] {
    -moz-appearance: textfield;
  }
}
</style>
