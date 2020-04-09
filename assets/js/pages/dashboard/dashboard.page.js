$(function () {

  if (!$('#dashboard-visits-chart').length) {
    return false;
  }

  drawVisitsChart();

  var el = null;
  var item = 'visits';

  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    el = e.target;
    item = $(el).attr('href').replace('#', '');
    switchHistoryCharts(item);
  });

  drawDashboardItemsList();

  var $dashboardSalesBreakdownChart = $('#dashboard-sales-breakdown-chart');

  if (!$dashboardSalesBreakdownChart.length) {
    return false;
  }

  drawSalesBreakdownChart();
});

function switchHistoryCharts(item) {
  var chartSelector = "#dashboard-" + item + "-chart";

  if ($(chartSelector).has('svg').length) {
    $(chartSelector).empty();
  }

  switch (item) {
    case 'visits':
      drawVisitsChart();
      break;
    case 'sales':
      drawSalesChart();
      break;
  }
}

async function drawVisitsChart() {

  var result = await Cloud['getVisitHistory'].with({})
    .tolerate((err) => {
      console.error(err);
    });

  var dataVisits = [];

  if (result) {
    console.log(result.data.viewHistory);
    dataVisits = result.data.viewHistory;
  }

  Morris.Line({
    element: 'dashboard-visits-chart',
    data: dataVisits,
    xkey: 'date',
    ykeys: ['count'],
    ymin: 'auto 40',
    labels: ['Visits'],
    xLabels: "day",
    hideHover: 'auto',
    yLabelFormat: function (y) {
      // Only integers
      if (y === parseInt(y, 10)) {
        return y;
      } else {
        return '';
      }
    },
    resize: true,
    lineColors: [
      config.chart.colorSecondary.toString(),
    ],
    pointFillColors: [
      config.chart.colorPrimary.toString(),
    ]
  });
}

async function drawSalesChart() {

  var result = await Cloud['getSalesHistory'].with({})
    .tolerate((err) => {
      console.error(err);
    });

  var dataSales = [];

  if (result) {
    console.log(result.data.salesHistory);
    dataSales = result.data.salesHistory;
  }

  Morris.Bar({
    element: 'dashboard-sales-chart',
    data: dataSales,
    xkey: 'date',
    ykeys: ['sales'],
    labels: ['Sales'],
    hideHover: 'auto',
    resize: true,
    barColors: [
      config.chart.colorPrimary.toString(),
      tinycolor(config.chart.colorPrimary.toString()).darken(10).toString()
    ],
  });
}

function drawDashboardItemsList(pageNum) {
  $.ajax({
    url: '/dashboard/getPagedMachineSales',
    data: {
      pageNum: pageNum
    },
    success: function (result) {
      $('#dashboard-item-list-container').html(result);
      drawDashboardItemsListSparklines();
    }
  });
}

function drawDashboardItemsListSparklines() {
  $(".dashboard-page .items .sparkline").each(function () {
    var type = $(this).data('type');

    var tendency = $(this).data('tendency')
    if (tendency) {
      var data = tendency.split(',').map(function (item) {
        if (item.indexOf(":") > 0) {
          return item.split(":");
        } else {
          return item;
        }
      });
    }
    // Generate random data
    else {
      var data = [];
      for (var i = 0; i < 17; i++) {
        data.push(Math.round(100 * Math.random()));
      }
    }

    $(this).sparkline(data, {
      barColor: config.chart.colorPrimary.toString(),
      height: 'auto',
      type: type
    });
  });
}

async function drawSalesBreakdownChart() {

  var $dashboardSalesBreakdownChart = $('#dashboard-sales-breakdown-chart');
  $dashboardSalesBreakdownChart.empty();

  var result = await Cloud['getSalesBreakdown'].with({})
    .tolerate((err) => {
      console.error(err);
    });

  var dataSalesBreakdown = [];

  if (result) {
    console.log(result.data.salesBreakdown);
    dataSalesBreakdown = result.data.salesBreakdown;
  }

  Morris.Donut({
    element: 'dashboard-sales-breakdown-chart',
    data: dataSalesBreakdown,
    resize: true,
    colors: [
      tinycolor(config.chart.colorPrimary.toString()).lighten(10).toString(),
      tinycolor(config.chart.colorPrimary.toString()).darken(8).toString(),
      config.chart.colorPrimary.toString()
    ],
  });

  var $sameheightContainer = $dashboardSalesBreakdownChart.closest(".sameheight-container");

  setSameHeights($sameheightContainer);
}


