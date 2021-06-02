<template>
  <base-content>
    <div class="container q-pa-lg q-col-gutter-md">
      <div class="row justify-between q-col-gutter-md">
        <div class="col-xs-12 col-md-3 q-gutter-md">
          <q-card class="income ">
            <q-card-section horizontal>
              <q-card-section class="col">
                <div class="text-subtitle2 text-white">
                  Income
                  <q-icon color="yellow" name="trending_up"/>
                </div>
                <div class="text-h6 q-mt-sm q-mb-xs text-white">
                  <count-to :startVal='906584' :endVal='952765' :duration='1500'/>
                  ¥
                </div>
              </q-card-section>
              <q-card-section class="col">
                <div style="height: 100%;max-width: 150px">
                  <v-chart :option="income"/>
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
          <q-card class="expense ">
            <q-card-section horizontal>
              <q-card-section class="col">
                <div class="text-subtitle2 text-white">
                  Expense
                  <q-icon color="green" name="trending_down"/>
                </div>
                <div class="text-h6 q-mt-sm q-mb-xs text-white">
                  <count-to :startVal='400326' :endVal='439956' :duration='1500'/>
                  ¥
                </div>
              </q-card-section>
              <q-card-section class="col">
                <div style="height: 100%;width: 150px">
                  <v-chart :option="expense"/>
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
          <q-card class="total ">
            <q-card-section horizontal>
              <q-card-section class="col">
                <div class="text-subtitle2 text-white">
                  Total
                  <q-icon color="yellow" name="trending_up"/>
                </div>
                <div class="text-h6 q-mt-sm q-mb-xs text-white">
                  <count-to :startVal='706198' :endVal='756268' :duration='1500'/>
                  ¥
                </div>
              </q-card-section>
              <q-card-section class="col">
                <div style="height: 100%;width: 150px">
                  <v-chart class="" :option="total"/>
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-xs-12 col-md-9">
          <q-card class="cimo-shadow col-11" style="height: 100%;min-height:390px;padding: 3px;">
            <v-chart class="" :option="charts2Option" autoresize/>
          </q-card>
        </div>
      </div>
      <div class="row q-col-gutter-md">
        <div class="col-xs-12 col-md-3">
          <q-card class="cimo-shadow" style="height: 430px; width: 100%; padding: 3px">
            <v-chart class="" :option="chartPie" autoresize/>
          </q-card>
        </div>
        <div class="col-xs-12 col-md-3">
          <q-card class="my-card cimo-shadow">
            <q-img
              :src="'data/bird.jpg'"
            />
            <q-card-section>
              <div class="text-overline text-orange-9">Overline</div>
              <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
            </q-card-section>
            <q-card-actions>
              <q-btn flat color="dark" label="Share"/>
              <q-btn flat color="primary" label="Book"/>

              <q-space/>

              <q-btn
                color="grey"
                round
                flat
                dense
                :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                @click="expanded = !expanded"
              />
            </q-card-actions>

            <q-slide-transition>
              <div v-show="expanded">
                <q-separator/>
                <q-card-section class="text-subitle2">
                  {{ lorem }}
                </q-card-section>
              </div>
            </q-slide-transition>
          </q-card>
        </div>
        <div class="col-xs-12 col-md-6">
          <q-table
            class="cimo-shadow"
            :grid="$q.screen.xs"
            title="Treats"
            :data="data"
            :columns="columns"
            :filter="filter"
            row-key="name"
            style="height: 430px;"
          >
            <template v-slot:top-right>
              <q-input dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search"/>
                </template>
              </q-input>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                <q-td key="calories" :props="props">{{ props.row.calories }}</q-td>
                <q-td key="fat" :props="props">{{ props.row.fat }}</q-td>
                <q-td key="carbs" :props="props">{{ props.row.carbs }}</q-td>
                <q-td key="operating" :props="props">
                  <q-btn class="btn-table text-white" icon="tune" label="详情" @click="handleTableClick(props.row)"/>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </base-content>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BaseContent from 'components/BaseContent/BaseContent.vue';
import {CountTo} from 'vue3-count-to'
import { thumbStyle } from 'components/BaseContent/ThumbStyle'
import chartPie from './echarts/echarts-1'
import charts2Option from './echarts/echarts-2'
import { income, expense, total } from './echarts/echarts-3'
import chartZ from './echarts/echarts-4'
import {useRouter} from "vue-router";
import VChart, { THEME_KEY } from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from "echarts/components";
use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);
export default defineComponent({
  name: 'Home',
  components: {
    BaseContent,
    CountTo,
    VChart
  },
  setup() {
    const $router = useRouter();
    function handleTableClick (e) {
      $router.push({
        path: 'table-detail',
        query: {
          id: e.name
        }
      })
    }
    return {
      handleTableClick,
      expanded: ref(false),
      chartPie: ref(chartPie),
      chartZ: ref(chartZ),
      charts2Option: ref(charts2Option),
      income: ref(income),
      expense: ref(expense),
      total: ref(total),
      thumbStyle,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      filter: ref(''),
      columns: ref([
        {
          name: 'name',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'calories',
          align: 'center',
          label: 'Calories',
          field: 'calories',
          sortable: true
        },
        {
          name: 'fat',
          label: 'Fat (g)',
          field: 'fat',
          sortable: true
        },
        {
          name: 'carbs',
          label: 'Carbs (g)',
          field: 'carbs'
        },
        {
          name: 'operating',
          label: 'operating',
          align: 'center',
          field: 'operating',
          sortable: true
        }
      ]),
      data: ref([
        {
          name: 'FrozenYogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24
        },
        {
          name: 'IceCreamSandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49
        },
        {
          name: 'JellyBean',
          calories: 375,
          fat: 0.0,
          carbs: 94
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65
        }
      ])
    }
  }
});
</script>
<style lang="scss" scoped>
.my-card {
  width: 100%;
  min-height: 390px;
  height: 100%;
}

.income {
  width: 100%;
  background: linear-gradient(to right, #68E4BC 0%, #4AD0D1 99%);
  border-radius: 5px;
  font-size: 14px;
  padding: 11px 15px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: #ffffff;
  box-shadow: 0 12px 12px -11px #0db4afb8;
  background-size: 200% auto;
}

.income:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px #0db4afb8;
}

.expense {
  width: 100%;
  background: linear-gradient(to left, #FCAC94 0%, #f3a183 98%);
  border-radius: 5px;
  font-size: 14px;
  padding: 11px 15px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: #ffffff;
  box-shadow: 0 12px 12px -11px #FCA76C;
  background-size: 200% auto;
}

.expense:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px #FCA76C;
}

.total {
  width: 100%;
  background: linear-gradient(90deg, #F073C8 0%, #FF6A95 99%);
  border-radius: 5px;
  font-size: 14px;
  padding: 11px 15px;
  font-weight: bold;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: #ffffff;
  box-shadow: 0 12px 12px -11px rgba(240, 115, 200, 0.73);
  background-size: 200% auto;
}

.total:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px rgba(240, 115, 200, 0.73);
}

.btn-table {
  background: linear-gradient(to right, #36d1dc, #5b86e5);
  transition: all 0.3s ease-in-out;
}

.btn-table:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px #5b86e5;
}
</style>
