<template>
  <div>
    <h1 class="text-center">Register</h1>

    <v-form v-model="valid" ref="formRegister">
      <v-row justify="center">
        <v-col cols="8" md="4">
          <v-text-field
            v-model="user.name"
            label="Name"
            :rules="nameRules"
            required
          >
          </v-text-field>
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
          <v-text-field
            v-model="user.confirmPassword"
            label="Confirm Password"
            :rules="confirmPasswordRules"
            required
          >
          </v-text-field>
          <v-btn
            class="mr-5"
            color="error"
            :disabled="!valid"
            @click="registerUser"
            >Register</v-btn
          >
          <v-btn color="error" @click="reset">Reset</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default {
  data() {
    return {
      valid: false,
      user: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      nameRules: [
        (v) => (v && !!v.trim()) || "Write something, not just spaces",
        (v) => !!v || "Please type name",
        (v) => (v && v.length > 5) || "More than 6 characters required",
      ],
      emailRules: [
        (v) => (v && !!v.trim()) || "Write something, not just spaces",
        (v) => !!v || "Please type email",
        (v) =>
          /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(v) || "Incorrect email format",
      ],
      passwordRules: [
        (v) => (v && !!v.trim()) || "Write something, not just spaces",
        (v) => !!v || "Please type password",
        (v) => (v && v.length > 5) || "More than 6 characters required",
        (v) => (v && v.length < 12) || "Less than 12 characters required",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Must confirm password",
        (v) =>
          v === this.user.password ||
          "The password confirmation does not match...",
      ],
    };
  },
  methods: {
    async registerUser() {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.user.email,
          this.user.password
        );
        console.log(userCredential);
        this.$router.push({ name: "login" });
      } catch (error) {
        console.log(error.code);
        switch (error.code) {
          case "auth/email-already-in-use":
            alert("El correo ya está siendo utilizado");
            break;
        }
      }
    },
    reset() {
      this.$refs.formRegister.reset();
    },
  },
};
</script>
