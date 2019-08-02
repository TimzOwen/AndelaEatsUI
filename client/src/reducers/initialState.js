export default {
  isLoading: false,
  activeUser: {},
  menus: [],
  loading_permisions: false,
  loading_roles: false,
};

export const initialMenus = {
  menus: [],
  isLoading: false,
  acc1: '',
  acc2: '',
  mainMeal: '',
  message: '',
  selectedMeal: '',
  orderedMenus: [],
};

export const initialVendorsPerformance = {
  isLoading: false,
  collectedOrders: [],
  uncollectedOrders: [],
  cancelledOrders: [],
  datesConsidered: [],
  vendorRatings: [],
  vendorName: '',
  error: '',
};

export const orders = {
  isLoading: false,
  error: '',
  totalRecords: 0,
  currentPage: 1,
  meals: [],
  isFiltered: false,
  orders: [],
  menu: {
    meal: {
      main: [],
      firstAccompaniment: [],
      secondAccompaniment: [],
    },
  },
  isDeleting: false,
  rating: 0,
};

export const initialVendors = {
  isLoading: false,
  isCreating: false,
  isSuspending: false,
  isUpdating: false,
  vendors: [],
};

export const mealOrders = {
  isLoading: false,
  orders: [],
  currentPage: '',
};

export const initialMealItems = {
  isLoading: false,
  isDeleting: false,
  meals: [],
  filteredMeals: [],
  pagination: null,
  mealExists: null,
  loadingMealExistence: null,

  mealModal: {
    show: false,
    edit: false,
    addBtnDisabled: false,
    errors: [],
    isLoading: false,
  },
};

export const initialMealSessions = {
  mealSessionModal: {
    show: false,
    edit: false,
  },
};

export const initialAdminMenus = {
  isLoading: false,
  isDeleting: false,
  isCreating: false,

  dateOfMeal: null,
  mealPeriod: null,
  menuList: [],
  vendorEngagements: [],
  mealItems: [],

  meta: null,
  error: {
    status: false,
    message: null,
  },
};

export const initialEngagements = {
  isLoading: false,
  isCreating: false,
  isDeleting: false,
  isUpdating: false,
  engagements: [],
  upComingEngagements: {
    engagements: [],
  },
  vendors: [],
};

export const initialSuspendedVendors = {
  isLoading: false,
  vendors: [],
};

export const initialUser = {
  role: 0,
  adminUsers: [],
  email: '',
  message: '',
  loading: false,
  roles: [],
  permisions: [],
  error: {
    status: false,
    message: null,
  },
  all_permisions: [],
  isDeleting: false
};


export const initialMealRatings = {
  isLoading: false,
  ratingList: [],
};

export const initialFaqs = {
  isLoading: false,
  isCreating: false,
  isDeleting: false,
  isUpdating: false,
  faqs: [],
};

export const initialAbout = {
  isLoading: false,
  isUpdating: false,
  about: {}
};

export const initialUsers = {
  users: [],
  loading: false,
  roles: []
};
export const initialTappedUsers = {
  data: [],
  error: '',
};
