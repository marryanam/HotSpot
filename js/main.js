
$(document).ready(function() {

// ============= mask tel =============


    $( "input, textarea").on('click focus', function() {
        $(this).next().addClass('active');
    });

    $( "input").each(function() {
        var elem = $(this);
        setTimeout(function(){
          if(elem.val() !== ""){
            elem.next().addClass('active');
          }
        }, 200);
    });

    $( "input, textarea").blur(function() {
        var elem = $(this);
        setTimeout(function(){
          if(elem.val() === ""){
             elem.next().removeClass('active');
          }
        }, 200);
    });

    function setCursorPosition(pos, element) {
        element.focus();
        if (element.setSelectionRange) {element.setSelectionRange(pos, pos);}
            else if (element.createTextRange) {
              var range = element.createTextRange();
              range.collapse(true);
              range.moveEnd("character", pos);
              range.moveStart("character", pos);
              range.select();
            }
    }
    function mask(event) {
        var item = event.target;
        var number = "+__(___)-___-__-__",
            i = 0,
            def = number.replace(/\D/g, ""),
            val = item.value.replace(/\D/g, "");
        if (def.length >= val.length) {val = def;}
            item.value = number.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a ;
        });
        if (event.type === "blur") {
            if (item.value.length === 2) {
                item.value = "";
            }
        } else {setCursorPosition(item.value.length, item);}
      }
      var tel = $("input[type='tel']");
      tel.bind("input blur focus click" , mask);



// ============= menu =============


      $('.menu__title').on('click', function(){
        $('html,body').find('.menuPopup').css({
            "width": "100%",
            "left":"0",
            "top":"0",
            "height": "100%"
        }),
        $('html,body').css('overflow-y', 'hidden');

      })
      $('.menuPopup__close, .menuPopup__link').on('click', function(){
         $('html,body').find('.menuPopup').css({
            "width": "100%",
            "height": "0",
            "left":"0",
            "top":"-100%"
        }),
        $('html,body').css('overflow-y', 'visible');
      });


// ============= 404 SCROLL =============

    $('.menuPopup__link').on('click', function(event){
        if (!$(this).hasClass('menuPopup__link')) {
            event.preventDefault();
            var $id = $(this).attr('href');
            sctroll($id);
        }

    });

// ============= CURSOR =============


function cursor(){
    const cursor = document.querySelector(".cursor");

    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;

    let speed = 0.5; 

    function animate() {
      let distX = mouseX - cursorX;
      let distY = mouseY - cursorY;

      cursorX = cursorX + distX * speed;
      cursorY = cursorY + distY * speed;

      cursor.style.left = cursorX + "px";
      cursor.style.top = cursorY + "px";

      requestAnimationFrame(animate);
    }

    animate();

    document.addEventListener("mousemove", function(event) {
      mouseX = event.pageX;
      mouseY = event.pageY;
    });
}
 cursor();

// ============= Moving Background =============

    var bg = document.querySelector('.background');
    function movingBackground(){
        var windowWidth = window.innerWidth / 5;
        var windowHeight = window.innerHeight / 5 ;

        document.addEventListener('mousemove', (e) => {
            var mouseX = e.clientX / windowWidth;
            var mouseY = e.clientY / windowHeight;
            bg.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`;
                if (window.matchMedia("(max-width: 1200px)").matches) {
                    bg.style.transform = `none`;
                }
        });
    }
    if(bg){
        movingBackground();
    }


// ============= WOW =============
    wow = new WOW(
        {
          boxClass:     'wow',      
          animateClass: 'animated', 
          offset:       0,          
          mobile:       true,      
          live:         true        
        }
    )
    wow.init();


});


// ============= PRELOADER =============

    $(window).on('load', function () {
        var $preloader = $('.preloader'),
            $preloader__img = $('.preloader__img'),
            $svg_anm   = $preloader.find('.preloader_block');
        $preloader__img.fadeOut();
        $svg_anm.delay(100).fadeOut();
        $preloader.delay(500).fadeOut('slow');
    });


// ============= AJAX =============

    $(document).on('submit', '.form', function (e) {
        e.preventDefault();
        var name = $(this).find(".form-name").val();
        var checkbox = $(this).find(".form-check:checked").val();
        var tel = $(this).find(".form-tel").val();
        var email = $(this).find(".form-email").val();
        var button = $(this).find(".submit-ajax");
        var data = {
            action: 'ajax_form',
            name: name,
            tel: tel,
            email: email,
            checkbox: checkbox,
            header: "Order form. You receive a new request."
        };
        $.ajax({
            url: "/send.php",
            method: 'post',
            data: data,
            success: function (response) {
                button.text('Sent ✔'),
                    $('form').trigger('reset');
            }
        });
    });


