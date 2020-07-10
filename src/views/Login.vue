<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-200 ">

    <!-- card -->
    <div class="flex overflow-hidden bg-white rounded-lg shadow-2xl">

      <!-- img -->
      <div clas="flex md:w-1/4">
        <img class="hidden object-cover w-full p-12 md:block" src="@/assets/login.svg">
      </div>
      <!-- img end -->


      <!-- text -->
      <div class="flex flex-col w-full px-12 py-24 md:w-3/4">
        Welcome
        <!-- form -->
          <div class="flex flex-wrap w-full">
            <label for="email" class="block mb-2 text-sm font-bold text-gray-700">Email</label>
            <input v-model="form.email" type="email" class="w-full shadow-md form-input" name="email" autocomplete="email" />
            <span v-if="errors.email"> {{errors.email[0]}}</span>
          </div>
        
          <div class="flex flex-wrap w-full">
            <label for="password" class="block mb-2 text-sm font-bold text-gray-700">Password</label>
            <input v-model="form.password" type="password" class="w-full shadow-md form-input" name="password" />
            <span v-if="errors.password"> {{errors.password[0]}}</span>
          </div>

          <div class="flex flex-wrap">
            <button type="submit" @click.prevent="handleLogin" class="inline-block px-4 py-2 text-base font-bold leading-normal text-center text-gray-100 no-underline whitespace-no-wrap align-middle bg-blue-500 border rounded select-none hover:bg-blue-700">Login</button>
          </div>
        <!-- form end -->

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