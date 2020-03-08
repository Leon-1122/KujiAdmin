$(function () {

  if (!$('#dashboard-visits-chart').length) {
    return false;
  }

  // drawing visits chart
  drawVisitsChart();

  var el = null;
  var item = 'visits';

  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {

    el = e.target;
    item = $(el).attr('href').replace('#', '');
    switchHistoryCharts(item);

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

  function drawVisitsChart() {
    var dataVisits = [
      {x: '2015-09-01', y: 70},
      {x: '2015-09-02', y: 75},
      {x: '2015-09-03', y: 50},
      {x: '2015-09-04', y: 75},
      {x: '2015-09-05', y: 50},
      {x: '2015-09-06', y: 75},
      {x: '2015-09-07', y: 86}
    ];


    Morris.Line({
      element: 'dashboard-visits-chart',
      data: dataVisits,
      xkey: 'x',
      ykeys: ['y'],
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

  function drawSalesChart() {

    var dataDownloads = [
      {
        year: '2006',
        sales: 1300
      },
      {
        year: '2007',
        sales: 1526
      },
      {
        year: '2008',
        sales: 2000
      },
      {
        year: '2009',
        sales: 1800
      },
      {
        year: '2010',
        sales: 1650
      },
      {
        year: '2011',
        sales: 620
      },
      {
        year: '2012',
        sales: 1000
      },
      {
        year: '2013',
        sales: 1896
      },
      {
        year: '2014',
        sales: 850
      },
      {
        year: '2015',
        sales: 1500
      }
    ];


    Morris.Bar({
      element: 'dashboard-downloads-chart',
      data: dataDownloads,
      xkey: 'year',
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

  function drawDashboardItemsListSparklines() {
    $(".dashboard-page .items .sparkline").each(function () {
      var type = $(this).data('type');

      // There is predefined data
      if ($(this).data('data')) {
        var data = $(this).data('data').split(',').map(function (item) {
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

  drawDashboardItemsListSparklines();

  var $dashboardSalesBreakdownChart = $('#dashboard-sales-breakdown-chart');

  if (!$dashboardSalesBreakdownChart.length) {
    return false;
  }

  function drawSalesBreakdownChart() {

    $dashboardSalesBreakdownChart.empty();

    Morris.Donut({
      element: 'dashboard-sales-breakdown-chart',
      data: [{label: "Download Sales", value: 12},
        {label: "In-Store Sales", value: 30},
        {label: "Mail-Order Sales", value: 20}],
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

  drawSalesBreakdownChart();
});



