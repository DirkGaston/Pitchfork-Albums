<template>
  <div>
    <h1 class="text-center">Login</h1>

    <v-form v-model="valid" ref="formRegister">
      <v-row justify="center">
        <v-col cols="8" md="4">
          <v-text-field
            v-model="user.email"
            label="Email"
            :rules="emailRules"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="user.password"
            label="Password"
            :rules="passwordRules"
            required
          >
          </v-text-field>
          <v-btn
            class="mr-5"
            color="error"
            :disabled="!valid"
            @click="LoginUser"
            >Login</v-btn
          >
          <v-btn color="error" @click="reset">Reset</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";

export default {
  data() {
    return {
      valid: false,
      user: {
        email: "",
        password: "",
      },
      emailRules: [
        // (v) => (v && !!v.trim() > 1) || "Write something, not just spaces",
        (v) => !!v || "Doesn't exist...",
        (v) =>
          /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(v) || "Incorrect email format",
      ],
      passwordRules: [
        (v) => !!v || "Doesn't exist...",
        (v) => (v && v.length > 5) || "More than 6 characters required",
      ],
    };
  },
  methods: {
    loginUser() {
      signInWithEmailAndPassword(auth, this.user.email, this.user.password)
        .then((userCredential) => console.log(userCredential))
        .catch((e) => console.log(e));
    },
    reset() {
      console.log("reset...");
      this.$refs.formRegister.reset();
    },
  },
};
</script>
