var tabItem = 'visits';

$(function () {

  if (!$('#dashboard-visits-chart').length) {
    return false;
  }

  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    tabItem = $(e.target).attr('href').replace('#', '');
    switchHistoryCharts(tabItem);
  });

  drawDashboard();
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

function drawDashboard() {
  switchHistoryCharts(tabItem);
  drawDashboardItemsList();
  drawSalesBreakdownChart();
}

async function drawVisitsChart() {
  $('#dashboard-visits-chart').empty();
  var period = $('#period').val();
  var result = await Cloud['getVisitHistory'].with({period: period})
    .tolerate((err) => {
      console.error(err);
    });

  var dataVisits = [];

  if (result) {
    dataVisits = result.data.viewHistory;
  }

  if (dataVisits.length > 0) {
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
}

async function drawSalesChart() {
  $('#dashboard-sales-chart').empty();
  var period = $('#period').val();
  var result = await Cloud['getSalesHistory'].with({period: period})
    .tolerate((err) => {
      console.error(err);
    });

  var dataSales = [];

  if (result) {
    dataSales = result.data.salesHistory;
  }

  if (dataSales.length > 0) {
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
}

function drawDashboardItemsList(pageNum) {
  var period = $('#period').val();
  $.ajax({
    url: '/dashboard/getPagedMachineSales',
    data: {
      pageNum: pageNum,
      period: period
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
    var data = [];
    var tendency = $(this).data('tendency');
    if (tendency) {
      data = tendency.split(',').map(function (item) {
        if (item.indexOf(":") > 0) {
          return item.split(":");
        } else {
          return item;
        }
      });
    }

    $(this).sparkline(data, {
      barColor: config.chart.colorPrimary.toString(),
      height: 'auto',
      type: type
    });
  });
}

async function drawSalesBreakdownChart() {
  var period = $('#period').val();
  var $dashboardSalesBreakdownChart = $('#dashboard-sales-breakdown-chart');
  $dashboardSalesBreakdownChart.empty();

  var result = await Cloud['getSalesBreakdown'].with({period: period})
    .tolerate((err) => {
      console.error(err);
    });

  var dataSalesBreakdown = [];

  if (result) {
    dataSalesBreakdown = result.data.salesBreakdown;
  }

  if (dataSalesBreakdown.length > 0) {
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
  }

  var $sameheightContainer = $dashboardSalesBreakdownChart.closest(".sameheight-container");
  setSameHeights($sameheightContainer);
}


