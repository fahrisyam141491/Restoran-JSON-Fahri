function tampilkanAllmenu() {
    $.getJSON("assets/data/menu.json", function (result) {
        var menu = result.menu;
        $.each(menu, function (i, data) {
            $('#content-menu').append('<div class="card" style="width: 18rem;display:inline-block;margin:20px 26px;"><button class="btn btn-light" style="margin:10px;;color:#d0d0d0;border-radius:0 0 0 30px;padding:12px;position:absolute;right:0;"><i class="fa fa-cart-plus"></i></button><img src="' + data.gambar + '" class="card-img-top" style="width:60%;height:60%;margin-left:20%;"><div class="card-body"><h4>' + data.nama + ' <span style="display:block;">/ Rp. ' + data.harga + '<sup>.00</sup></span></h4><p class="card-text">' + data.deskripsi + '</p></div></div>');
        });
    });
}

function SortMenu(command = "asc") {
    return function MenuSort(a, b) {
        var namaA = a.nama.toLowerCase();
        var namaB = b.nama.toLowerCase();
        var compare = 0;
        if (namaA > namaB) {
            compare = 1;
        } else if (namaA < namaB) {
            compare = -1;
        }
        return (command == "desc" ? compare * -1 : compare);
    }
}

function SortPrice(command = "asc") {
    return function PriceSort(a, b) {
        var hargaA = a.harga;
        var hargaB = b.harga;
        var compare = 0;
        if (hargaA > hargaB) {
            compare = 1;
        } else if (hargaA < hargaB) {
            compare = -1;
        }
        return (command == "desc" ? compare * -1 : compare);
    }
}
var menus = [];

$.getJSON('assets/data/menu.json', function (results) {
    var menu = results.menu;
    $.each(menu, function (i, data) {
        menus.push(data);
    });
});

tampilkanAllmenu();

$('.nav-item').on('click', function () {
    $('.nav-item').removeClass('active');
    $(this).addClass("active");
    $('.btn-sort-data').text("sorting data ").addClass("dropdown-toggle");
    $('.btn-sort-harga').text("sorting price ").addClass("dropdown-toggle");
    $('.dropdown-item').removeClass('active');
    var kategori = $.trim($(this).text());
    $('.h4-menu').html(kategori);
    if (kategori == "All menu") {
        tampilkanAllmenu();
    }
    $.getJSON("assets/data/menu.json", function (result) {
        var menu = result.menu;
        var content = "";
        $.each(menu, function (i, data) {
            if (data.kategori == kategori.toLowerCase()) {
                content += '<div class="card" style="width: 18rem;display:inline-block;margin:20px 26px;"><button class="btn btn-light" style="margin:10px;;color:#d0d0d0;border-radius:0 0 0 30px;padding:12px;position:absolute;right:0;"><i class="fa fa-cart-plus"></i></button><img src="' + data.gambar + '" class="card-img-top" style="width:60%;height:60%;margin-left:20%;"><div class="card-body"><h4>' + data.nama + ' <span style="display:block;">/ Rp. ' + data.harga + '<sup>.00</sup></span></h4><p class="card-text">' + data.deskripsi + '</p></div></div>';
            } else if (kategori == "All menu") {
                $.getJSON("assets/data/menu.json", function (result) {
                    var menu = result.menu;
                    $.each(menu, function (i, data) {
                        $('#content-menu').append('<div class="card" style="width: 18rem;display:inline-block;margin:20px 26px;"><button class="btn btn-light" style="margin:10px;;color:#d0d0d0;border-radius:0 0 0 30px;padding:12px;position:absolute;right:0;"><i class="fa fa-cart-plus"></i></button><img src="' + data.gambar + '" class="card-img-top" style="width:60%;height:60%;margin-left:20%;"><div class="card-body"><h4>' + data.nama + ' <span style="display:block;">/ Rp. ' + data.harga + '<sup>.00</sup></span></h4><p class="card-text">' + data.deskripsi + '</p></div></div>');
                    });
                });
                return false;
            }
        });
        $('#content-menu').html(content);
    });
});

$('.dropdown-menu-data a').on('click', function () {
    var tempmenu = [];
    var content = "";
    $('.btn-sort-data').text($(this).text());
    $('.btn-sort-price').text($(this).text());
    $('.dropdown-item').removeClass('active');
    $(this).addClass('active');
    var kategori = $(".h4-menu").text();
    for (var i = 0; i < menus.length; i++) {
        if (menus[i].kategori == kategori.toLowerCase()) {
            tempmenu.push(menus[i]);
        } else if (kategori == "All menu") {
            tempmenu.push(menus[i]);
        }
    }
    var sort = $(this).text().toLowerCase();
    if (sort == "a to z") {
        tempmenu = tempmenu.sort(SortMenu("asc"));
        $.each(tempmenu, function (z, tempmenus) {
            content += '<div class="card" style="width: 18rem;display:inline-block;margin:20px 26px;"><button class="btn btn-light" style="margin:10px;;color:#d0d0d0;border-radius:0 0 0 30px;padding:12px;position:absolute;right:0;"><i class="fa fa-cart-plus"></i></button><img src="' + tempmenus.gambar + '" class="card-img-top" style="width:60%;height:60%;margin-left:20%;"><div class="card-body"><h4>' + tempmenus.nama + ' <span style="display:block;">/ Rp. ' + tempmenus.harga + '<sup>.00</sup></span></h4><p class="card-text">' + tempmenus.deskripsi + '</p></div></div>';
        })
    } else if (sort == "z to a") {
        tempmenu = tempmenu.sort(SortMenu("desc"));
        $.each(tempmenu, function (z, tempmenus) {
            content += '<div class="card" style="width: 18rem;display:inline-block;margin:20px 26px;"><button class="btn btn-light" style="margin:10px;;color:#d0d0d0;border-radius:0 0 0 30px;padding:12px;position:absolute;right:0;"><i class="fa fa-cart-plus"></i></button><img src="' + tempmenus.gambar + '" class="card-img-top" style="width:60%;height:60%;margin-left:20%;"><div class="card-body"><h4>' + tempmenus.nama + ' <span style="display:block;">/ Rp. ' + tempmenus.harga + '<sup>.00</sup></span></h4><p class="card-text">' + tempmenus.deskripsi + '</p></div></div>';
        })
    }
    $('#content-menu').html(content);
});

$('.dropdown-menu-harga a').on('click', function () {
    var tempharga = [];
    var content = "";
    $('.btn-sort-harga').text($(this).text());
    $('.btn-sort-price').text($(this).text());
    $('.dropdown-item').removeClass('active');
    $(this).addClass('active');
    var kategori = $(".h4-menu").text();
    for (var i = 0; i < menus.length; i++) {
        if (menus[i].kategori == kategori.toLowerCase()) {
            tempharga.push(menus[i]);
        } else if (kategori == "All menu") {
            tempharga.push(menus[i]);
        }
    }
    var sort = $(this).text().toLowerCase();
    if (sort == "low to high") {
        tempharga = tempharga.sort(SortPrice('asc'));
        $.each(tempharga, function (z, temphargas) {
            content += '<div class="card" style="width: 18rem;display:inline-block;margin:20px 26px;"><button class="btn btn-light" style="margin:10px;;color:#d0d0d0;border-radius:0 0 0 30px;padding:12px;position:absolute;right:0;"><i class="fa fa-cart-plus"></i></button><img src="' + temphargas.gambar + '" class="card-img-top" style="width:60%;height:60%;margin-left:20%;"><div class="card-body"><h4>' + temphargas.nama + ' <span style="display:block;">/ Rp. ' + temphargas.harga + '<sup>.00</sup></span></h4><p class="card-text">' + temphargas.deskripsi + '</p></div></div>';
        })
    } else if (sort == "high to low") {
        tempharga = tempharga.sort(SortPrice("desc"));
        $.each(tempharga, function (z, temphargas) {
            content += '<div class="card" style="width: 18rem;display:inline-block;margin:20px 26px;"><button class="btn btn-light" style="margin:10px;;color:#d0d0d0;border-radius:0 0 0 30px;padding:12px;position:absolute;right:0;"><i class="fa fa-cart-plus"></i></button><img src="' + temphargas.gambar + '" class="card-img-top" style="width:60%;height:60%;margin-left:20%;"><div class="card-body"><h4>' + temphargas.nama + ' <span style="display:block;">/ Rp. ' + temphargas.harga + '<sup>.00</sup></span></h4><p class="card-text">' + temphargas.deskripsi + '</p></div></div>';
        })
    }
    $('#content-menu').html(content);
});


$('#search-data').keydown(function () {
    $.getJSON('assets/data/menu.json', function (data) {
        var search = $('#search-data').val();
        var regex = new RegExp(search, 'i');
        var output;

        $.each(data, function (key, val) {
            if ((val.nama.search(regex) != -1) || (val.harga.search(regex) != -1)) {
                output += '<div class="card" style="width: 18rem;display:inline-block;margin:20px 26px;"><a href="#" style="margin:10px;background: rgb(109, 109, 100);color:#d4d4d4;border-radius:0 0 0 30px;padding:12px;position:absolute;right:0;"><i class="fa fa-cart-plus"></i></a><img src="' + val.gambar + '" class="card-img-top" style="width:60%;height:60%;margin-left:20%;"><div class="card-body"><h4>' + val.nama + ' <span style="display:block;">/ Rp. ' + val.harga + '<sup>.00</sup></span></h4><p class="card-text">' + val.deskripsi + '</p></div></div';
            }
        });
        $('#content-menu').html(output);
    })
})