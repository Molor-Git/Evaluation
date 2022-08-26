/* ~~~~~~~~~~~~~~~~ Api ~~~~~~~~~~~~~~~~ */
export const Api = (() => {
	const baseUrl = "http://localhost:4232";
	const courseListPath = "courseList";

	const getCourses = () =>
		fetch([baseUrl, courseListPath].join("/")).then((response) => response.json());

	return {
		getCourses,
	};
})();
