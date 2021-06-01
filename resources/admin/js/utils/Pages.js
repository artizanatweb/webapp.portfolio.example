/* ICONS */
import DashboardIcon from '@material-ui/icons/Dashboard';
import ProjectsIcon from '@material-ui/icons/Work';
import ResumeIcon from '@material-ui/icons/Description';
import CompaniesIcon from '@material-ui/icons/LocationCity';
import CategoryIcon from '@material-ui/icons/AccountTree';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import AmpStoriesIcon from '@material-ui/icons/AmpStories';
/* PAGES */
import DashboardPage from "./../pages/DashboardPage";
import CampaignsPage from "./../pages/CampaignsPage";
import ProductsPage from "./../pages/ProductsPage";
import CategoriesPage from "./../pages/CategoriesPage";

class Pages {
    constructor() {
        this.pages = [
            {
                'paths': ['/admin', '/admin/dashboard', '/admin/index'],
                'icon': <DashboardIcon />,
                'component': DashboardPage,
                'key': 'default_route',
                'name': 'Dashboard',
                'code': 'dashboard',
                'api': '/admin/api/dashboard',
            },
            {
                'paths': ['/admin/categories/:action?/:id?', '/admin/categories'],
                'icon': <CategoryIcon />,
                'component': CategoriesPage,
                'key': 'categories_route',
                'name': 'Categories',
                'code': 'categories',
                'api': '/admin/api/categories',
            },
            {
                'paths': ['/admin/products/:action?/:id?', '/admin/products'],
                'icon': <AmpStoriesIcon />,
                'component': ProductsPage,
                'key': 'products_route',
                'name': 'Products',
                'code': 'products',
                'api': '/admin/api/products',
            },
            {
                'paths': ['/admin/campaigns/:action?/:id?', '/admin/campaigns'],
                'icon': <ProjectsIcon />,
                'component': CampaignsPage,
                'key': 'projects_route',
                'name': 'Campaigns',
                'code': 'campaigns',
                'api': '/admin/api/campaigns',
            },
        ];
    }

    getByPathname(pathname) {
        let pathArray = pathname.split('/');
        let pathString = (pathArray.length > 2) ? `/${pathArray[1]}/${pathArray[2]}` : `/${pathArray[1]}`;

        let element = this.pages.find(page => {
            let paths = [];
            page.paths.forEach((path) => {
                let arrayPath = path.split('/');
                let newPath = `/${arrayPath[1]}`;
                if (arrayPath.length > 2) {
                    newPath += `/${arrayPath[2]}`;
                }

                paths.push(newPath);
            });

            return paths.includes(pathString);
        });
        if (undefined === element) {
            element = null;
        }

        return element;
    }

    getPages() {
        return this.pages;
    }

    getByCode(code) {
        return this.pages.find(page => page.code === code);
    }
}

export default new Pages();
