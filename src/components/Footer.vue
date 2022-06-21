<template>
  <nav text-xl mt-2 col fixed top-0 right-0>
    <button class="icon-btn m-2 !outline-none" title="darkmode" @click="toggleDark()">
      <div i-carbon-sun dark:i-carbon-moon />
    </button>

    <RouterLink class="icon-btn m-2" to="/" title="Home" >
      <div i-carbon-home />
    </RouterLink>
      <RouterLink class="icon-btn m-2" to="/about" title="About">
    <div i-carbon-dicom-overlay />
  </RouterLink > 
  </nav>
</template>