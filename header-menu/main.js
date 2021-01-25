jQuery( window ).on( 'scroll', function() {
    if ( 1000 < jQuery( this ).scrollTop() ) { // 1000px以上スクロールしたら
        jQuery( '#global-nav' ).addClass( 'm_fixed' );
    } else {
        Query( '#global-nav' ).removeClass( 'm_fixed' );
    }
});