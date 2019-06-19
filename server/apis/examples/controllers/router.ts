import controller from './controller'

export default [
	{
		path: "/",
		method: "post",
		handler: controller.create
	},
	{
		path: "/",
		method: "get",
		handler: controller.all
	},
	{
		path: "/:id",
		method: "get",
		handler: controller.byId
	},
];
