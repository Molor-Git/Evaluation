import { Api } from "./api/api.js";

/* ~~~~~~~~~~~~~~~~ View ~~~~~~~~~~~~~~~~ */
const View = (() => {
	const domstr = {
		courseContainer: "#courselist_container",
	};

	const render = (ele, tmp) => {
		ele.innerHTML = tmp;
	};

	const createTmp = (arr) => {
		let tmp = "";
		arr.forEach((courseList) => {
			tmp += `
			<div>
				<p>${courseList.courseName}</p>
				<p>Course Type: ${courseList.required}</p>
				<p>Course Credit: ${courseList.credit}</p>
			</div>
			<hr>
            `;
		});
		return tmp;
	};

	return {
		domstr,
		render,
		createTmp,
	};
})();

/* ~~~~~~~~~~~~~~~~ Model ~~~~~~~~~~~~~~~~ */
const Model = ((api, view) => {
	class Course {
		constructor(courseId, courseName, credits) {
			this.courseId = courseId;
			this.courseName = courseName;
			this.required = Boolean;
			this.credits = credits;
		}
	}
	class State {
		#courseList = [];

		get courseList() {
			return this.#courseList;
		}
		set courseList(newCourselist) {
			this.#courseList = [...newCourselist];

			const courseContainer = document.querySelector(view.domstr.courseContainer);
			const tmp = view.createTmp(this.#courseList);
			view.render(courseContainer, tmp);
		}
	}

	const { getCourses } = api;

	return {
		getCourses,
		Course,
		State,
	};
})(Api, View);

/* ~~~~~~~~~~~~~~~~ Controller ~~~~~~~~~~~~~~~~ */
const Controller = ((model, view) => {
	const state = new model.State();

	const selectCourses = () => {
		const courseContainer = document.querySelector(view.domstr.courseContainer);
		courseContainer.addEventListener("click", (event) => {
				state.courseList = state.courseList.filter(
					(course) => +course.id !== +event.target.id
				);
			model.selectCourses(+event.target.id);
		});
	};

	const init = () => {
		model.getCourses().then((courses) => {
			state.courseList = [...courses];
		});
	};

	const bootstrap = () => {
		init();
		selectCourses();
	};

	return {
		bootstrap,
	};
})(Model, View);

Controller.bootstrap();
