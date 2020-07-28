<template>
  <div class="flex items-center justify-center w-full max-w-2xl min-h-screen px-2 mx-auto overflow-y-auto lg:w-1/2">

    <!-- card -->
    <div class="flex w-full">

      <!-- text -->
      <div class="flex flex-col w-full px-2 pt-4 pb-4 md:px-12">
        <div class="pb-4 text-2xl font-bold text-center">Welcome.</div>
        <div v-if="accountCreated" class="-mt-4 font-semibold text-center text-green-500">Account Created</div>
        <!-- form -->
        <form v-on:submit.prevent="handleLogin">
          <div class="flex flex-col w-full pb-4">
            <label for="email" class="block mb-1 text-sm font-bold text-gray-700 uppercase">Email</label>
            <input v-model="form.email" type="email" class="w-full px-3 py-2 mt-1 font-semibold leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" name="email" autocomplete="email" />
            <div v-if="errors.email" class="text-sm font-semibold text-red-600"> {{errors.email[0]}}</div>
          </div>
        
          <div class="flex flex-col w-full pb-4">
            <label for="password" class="block mb-1 text-sm font-bold text-gray-700 uppercase">Password</label>
            <input v-model="form.password" type="password" class="w-full px-3 py-2 mt-1 font-semibold leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" name="password" />
            <div v-if="errors.password" class="text-sm font-semibold text-red-600"> {{errors.password[0]}}</div>
          </div>

          <div class="flex flex-wrap">
            <button type="submit" class="w-full mt-4 uppercase btn btn-black">Login</button>
          </div>
        </form>
        <!-- form end -->

        <div class="flex justify-between pt-4">
          <router-link to="/register" class="font-semibold cursor-pointer"> Create Account</router-link>
          <a href="#" class="font-semibold">Forgot Password?</a>
        </div>

        <!-- <div class="pt-4 text-center">or</div>
        <button class="w-full mt-4 btn btn-black">Login with Facebook</button> -->

      </div>
      <!-- text end -->


    </div>
    <!-- card end -->

  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return {
      form:{
        email: '',
        password: '',
        device_name: 'browser',
      },
      errors: []
    }
  },
  computed:{
		accountCreated: function() {
			return this.$store.state.user.accountCreated;
		},
  },
  methods: {
    handleLogin(){
      this.$store.dispatch('user/login', this.form)
        .then(() => {
          this.$router.push('/dashboard');
        },
        error => {
          if(error.response.status === 422){
            this.errors = error.response.data.errors;
          }
        }
      );
    } 
  },
}
</script>

<style>
</style>