<template>
  <div v-if="sessionId !== ''">
    <stripe-checkout
      ref="checkoutRef"
      :pk="'pk_test_51PmfS2LhULWNdD38hlhu2v9inwxQDZZDxFvqls05CYmpsZ7jALy8cuAXo09XOJ7s7gDeSN9iAa4aOhrV6MHpY0m400iviPvfAX'"
      :session-id="sessionId"
    />
  </div>
</template>

<script lang="ts">
import { StripeCheckout } from "@vue-stripe/vue-stripe";
export default {
  components: {
    StripeCheckout,
  },

  props: {
    sessionId: {
      type: String,
      required: true,
    },
  },

  watch: {
    sessionId() {
      if (this.sessionId !== "") {
        this.redirectTopCheckoutPage();
      }
    },
  },

  methods: {
    redirectTopCheckoutPage() {
      console.log("session", this.sessionId);
      // Ensure the DOM is updated and the ref is available
      this.$nextTick(() => {
        const checkoutRef = this.$refs.checkoutRef as InstanceType<
          typeof StripeCheckout
        >;

        if (
          checkoutRef &&
          typeof checkoutRef.redirectToCheckout === "function"
        ) {
          checkoutRef.redirectToCheckout();
        } else {
          console.error(
            "StripeCheckout ref not found or method not available."
          );
        }
      });
    },
  },
};
</script>
