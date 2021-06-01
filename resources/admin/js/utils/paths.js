export const authentication = {
    token: '/oauth/token',
    refresh: '/oauth/token/refresh',
    remove: function (tokenId) {
        return `/oauth/tokens/${tokenId}`;
    },
    user: '/admin/api/auth/user',
};

export const categories = {
    create: '/admin/api/categories',
    update: (id) => {
        return `/admin/api/categories/${id}`;
    },
    delete: (id) => {
        return `/admin/api/categories/${id}`;
    },
    show: (id) => {
        return `/admin/api/categories/${id}`;
    },
};

export const products = {
    create: '/admin/api/products',
    update: (id) => {
        return `/admin/api/products/${id}`;
    },
    delete: (id) => {
        return `/admin/api/products/${id}`;
    },
    show: (id) => {
        return `/admin/api/products/${id}`;
    },
};
