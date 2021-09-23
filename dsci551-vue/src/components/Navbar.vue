<template>
    <div>
        <b-navbar fixed="top" toggleable="lg" type="dark" variant="dark">
            <b-navbar-nav class="navbar-center">
                <b-navbar-brand href="#/">
                    <img src="https://www.freepnglogos.com/uploads/tesla-logo-png-red-31.png" alt="brand_logo" width="100" />
                </b-navbar-brand>
            </b-navbar-nav>
            <b-navbar-nav id="stock-page" class="ml-auto">
                <b-nav-item href="#/stock">
                    <b-button variant="primary">Stock</b-button>
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<style scoped>
    .navbar-center { 
        position: absolute; 
        left: 50%; 
        transform: translatex(-50%); 
    } 
</style>