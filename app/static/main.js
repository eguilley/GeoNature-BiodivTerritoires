// Select2 de Recherche de territoire 

function formatArea(area) {
    if (area.loading) {
        return area.text;
    }

    var $container = $(
        "<div class='clearfix'>" +
        "<div><strong><span id='select2-result-area__area_name'></span></strong>" +
        "&nbsp;(" +
        "<span id='select2-result-area__area_code'></span>)" +
        "&nbsp;" +
        "<span class='badge badge-primary text-right' id='select2-result-area__type_name'></span></div>" +
        "</div>"
    );

    $container.find("#select2-result-area__area_name").text(area.area_name);
    $container.find("#select2-result-area__type_name").text(area.type_name);
    $container.find("#select2-result-area__area_code").text(area.area_code);

    return $container;
}

function formatAreaSelection(area) {
    return area.area_name;
}

$(".search-territory-select").select2({
    ajax: {
        url: "/api/find/area",
        dataType: 'json',
        delay: 250,
        data: function(params) {
            return {
                q: params.term, // search term
                page: params.page
            };
        },
        processResults: function(data, params) {
            // parse the results into the format expected by Select2
            // since we are using custom formatting functions we do not need to
            // alter the remote JSON data, except to indicate that infinite
            // scrolling can be used
            params.page = params.page || 1;

            return {
                results: data.datas,
                pagination: {
                    more: (params.page * 30) < data.total_count
                }
            };
        },
        cache: true
    },
    placeholder: 'Recherchez un territoire',
    minimumInputLength: 3,
    templateResult: formatArea,
    templateSelection: formatAreaSelection
});