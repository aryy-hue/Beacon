// Vuetify 3 — Google-style Material 3 theme for Northwood LMS
// Soft blue primary (#0b57d0), light blue-white surfaces, pastel accents.
import 'vuetify/styles'
import { h } from 'vue'
import { createVuetify, type IconProps, type IconSet, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Material Symbols as the Vuetify icon set (no MDI dependency).
// Renders Vuetify internal icons (checkbox, select arrows, …) as ligatures.
const materialSymbols: IconSet = {
  component: (props: IconProps) =>
    h('span', { class: 'material-symbols-rounded', 'aria-hidden': true }, [String(props.icon)]),
}

const schoolLight: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#0b57d0',
    'on-primary': '#ffffff',
    'primary-container': '#d3e3fd',
    'on-primary-container': '#041e49',
    secondary: '#575e71',
    'on-secondary': '#ffffff',
    'secondary-container': '#dbe2f9',
    'on-secondary-container': '#161b26',
    tertiary: '#715573',
    'tertiary-container': '#fdd7e4',
    'on-tertiary-container': '#331726',
    error: '#ba1a1a',
    'error-container': '#ffdad6',
    background: '#f8fafd',
    'on-background': '#191c22',
    surface: '#ffffff',
    'on-surface': '#191c22',
    'surface-variant': '#e1e3e8',
    'on-surface-variant': '#44474e',
    outline: '#74777f',
    'surface-container-lowest': '#ffffff',
    'surface-container-low': '#f1f4f9',
    'surface-container': '#e9eef6',
    'surface-container-high': '#e3e9f2',
    'surface-container-highest': '#dde3ee',
  },
}

const schoolDark: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#a8c7fa',
    'on-primary': '#062e6f',
    'primary-container': '#004a77',
    'on-primary-container': '#d3e3fd',
    secondary: '#bec6dc',
    'on-secondary': '#1e2532',
    'secondary-container': '#3e4759',
    'on-secondary-container': '#dbe2f9',
    tertiary: '#dfb9c9',
    'tertiary-container': '#5c3a49',
    'on-tertiary-container': '#fdd7e4',
    error: '#ffb4ab',
    'error-container': '#93000a',
    background: '#131314',
    'on-background': '#e3e3e3',
    surface: '#1b1c1e',
    'on-surface': '#e3e3e3',
    'surface-variant': '#44474e',
    'on-surface-variant': '#c4c6d0',
    outline: '#8e9099',
    'surface-container-lowest': '#0e0e0e',
    'surface-container-low': '#1b1c1e',
    'surface-container': '#1f2023',
    'surface-container-high': '#282a2d',
    'surface-container-highest': '#333538',
  },
}

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'symbols',
    aliases: {
      collapse: 'keyboard_arrow_up',
      complete: 'check',
      cancel: 'cancel',
      close: 'close',
      delete: 'delete',
      clear: 'cancel',
      success: 'check_circle',
      info: 'info',
      warning: 'warning',
      error: 'error',
      prev: 'chevron_left',
      next: 'chevron_right',
      delimiter: 'fiber_manual_record',
      sortAsc: 'arrow_upward',
      sortDesc: 'arrow_downward',
      expand: 'expand_more',
      menu: 'menu',
      subgroup: 'arrow_drop_down',
      dropdown: 'arrow_drop_down',
      radioOn: 'radio_button_checked',
      radioOff: 'radio_button_unchecked',
      edit: 'edit',
      ratingEmpty: 'star_outline',
      ratingFull: 'star',
      ratingHalf: 'star_half',
      loading: 'autorenew',
      first: 'first_page',
      last: 'last_page',
      unfold: 'unfold_more',
      file: 'attach_file',
      plus: 'add',
      minus: 'remove',
      sort: 'sort',
      filter: 'filter_list',
      checkboxOn: 'check_box',
      checkboxOff: 'check_box_outline_blank',
      checkboxIndeterminate: 'indeterminate_check_box',
    },
    sets: { symbols: materialSymbols },
  },
  theme: {
    defaultTheme: 'schoolLight',
    themes: { schoolLight, schoolDark },
  },
  defaults: {
    VBtn: { rounded: 'lg', class: 'text-none font-weight-medium' },
    VCard: { rounded: 'xl' },
    VChip: { rounded: 'md' },
    VTextField: { variant: 'outlined', rounded: 'lg', color: 'primary' },
    VSelect: { variant: 'outlined', rounded: 'lg', color: 'primary' },
    VTextarea: { variant: 'outlined', rounded: 'lg', color: 'primary' },
    VNavigationDrawer: { color: 'surface-container-low' },
  },
})
