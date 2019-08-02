export const adminUsers = {
  msg: "string",
  payload: {
    adminUsers: [
      {
        id: "string",
        email: "string",
        name: "string",
        roles: [
          {
            id: 0,
            name: "string"
          }
        ]
      }
    ]
  },
};

export const newAdminUser = { 
  // data: {
  msg: "OK",
  payload: {
    user_role: {
      email: "admin.user@andela.com",
      id: 76,
      isActive: true,
      isDeleted: false,
      locationId: 1,
      roleId: 1,
      timestamps: { created_at: "2019-06-17", updated_at: "Mon, 17 Jun 2019 11:00:55 GMT" } 
    },
    userId: "-LTY8T0N1_9gwLINyKuY" 
  }
  // },
};

export const roles = {
  msg: "CREATED",
  payload: {
    roles: [
      {
        id: 1,
        isDeleted: false,
        name: "admin",
        help: "admin role",
        timestamps: {
          created_at: "2018-12-06",
          updated_at: "Thu, 06 Dec 2018 00:00:00 GMT"
        }
      }
    ]
  }
};

export const permisionData = {
  response: { data: { msg: "OK", } },
  role_id: 4,
  name: "delete_meal_item",
  keyword: "delete_meal_item"
};

export const permisions = {
  msg: "OK",
  payload: {
    permissions: [
      {
        id: 8,
        isDeleted: false,
        roleId: 1,
        name: "create_menu",
        keyword: "create_menu",
        timestamps: {
          created_at: "2018-10-16",
          updated_at: "Tue, 16 Oct 2018 13:27:51 GMT"
        }
      },
      {
        id: 7,
        isDeleted: false,
        roleId: 1,
        name: "delete_menu",
        keyword: "delete_menu",
        timestamps: {
          created_at: "2018-10-16",
          updated_at: "Tue, 16 Oct 2018 13:27:51 GMT"
        }
      },
    ]
  }
};

export const RolePermisions = {
  msg: "OK",
  payload: {
    role_id: 1,
    role_permissions: [
      {
        id: 8,
        isDeleted: false,
        roleId: 1,
        name: "create_menu",
        keyword: "create_menu",
        timestamps: {
          created_at: "2018-10-16",
          updated_at: "Tue, 16 Oct 2018 13:27:51 GMT"
        }
      },
      {
        id: 231,
        isDeleted: false,
        roleId: 1,
        name: "delete_permissions",
        keyword: "delete_permissions",
        timestamps: {
          created_at: "2018-11-01",
          updated_at: "Tue, 16 Oct 2018 13:27:51 GMT"
        }
      },
      {
        id: 7,
        isDeleted: false,
        roleId: 1,
        name: "delete_menu",
        keyword: "delete_menu",
        timestamps: {
          created_at: "2018-10-16",
          updated_at: "Tue, 16 Oct 2018 13:27:51 GMT"
        }
      },
    ]
  }
};
export const tappedUsers = {
  data: {
    msg: "OK",
    payload: [
      { date: "2019-06-04", count: 7 },
      { date: "2019-06-05", count: 0 },
      { date: "2019-06-06", count: 1 },
      { date: "2019-06-07", count: 1 },
      { date: "2019-06-10", count: 0 },
      { date: "2019-06-11", count: 0 }
    ]
  }
};

export const roleId = 1;
