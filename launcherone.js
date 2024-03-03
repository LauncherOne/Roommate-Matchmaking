<script>
    // JavaScript code for sticky navigation
    window.onscroll = () =&gt; stickyNav();

    const navbar = document.querySelector(".sticky-nav");
    const sticky = navbar.offsetTop;

    const stickyNav = () =&gt; window.pageYOffset &gt;= sticky ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
</script>
