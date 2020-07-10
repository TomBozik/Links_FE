<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-200 ">

    <!-- card -->
    <div class="flex max-w-6xl overflow-hidden bg-white rounded-lg shadow-2xl">

      <!-- img -->
      <div class="flex-col justify-center hidden w-4/12 px-6 md:flex">
        <img class="hidden md:block" src="@/assets/login.svg">
      </div>
      <!-- img end -->


      <!-- text -->
      <div class="flex flex-col w-full px-2 py-8 md:py-24 md:px-12 md:w-8/12">
        <div class="pb-12 text-2xl font-bold text-center">Welcome.</div>
        <!-- form -->
          <div class="flex flex-col w-full pb-6">
            <label for="email" class="block mb-2 text-sm font-bold text-gray-700">Email</label>
            <input v-model="form.email" type="email" class="w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" name="email" autocomplete="email" />
            <div v-if="errors.email" class="text-red-600"> {{errors.email[0]}}</div>
          </div>
        
          <div class="flex flex-col w-full pb-6">
            <label for="password" class="block mb-2 text-sm font-bold text-gray-700">Password</label>
            <input v-model="form.password" type="password" class="w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" name="password" />
            <div v-if="errors.password" class="text-red-600"> {{errors.password[0]}}</div>
          </div>

          <div class="flex flex-wrap">
            <button type="submit" @click="handleLogin" class="w-full mt-4 btn btn-black">Login</button>
          </div>
        <!-- form end -->

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