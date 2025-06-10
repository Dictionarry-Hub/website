<script>
  import Router from 'svelte-spa-router'
  import routes from './router'
  import Navbar from './navbar/navbar.svelte'
  import Footer from './footer/footer.svelte'
</script>

<Navbar />
<Router {routes} />
<Footer />
