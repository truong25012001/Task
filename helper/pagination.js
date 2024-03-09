module.exports = (objectPagination, query, countTasks) => {
	if(query.page) {
		objectPagination.currentPage = parseInt(query.page);
	}
	objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;
	const totalPage = Math.ceil(countTasks / objectPagination.limitItem);
	objectPagination.totalPage = totalPage;
	return objectPagination;

}