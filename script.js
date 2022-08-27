import { Api } from "./api/api.js";

/* ~~~~~~~~~~~~~~~~ View ~~~~~~~~~~~~~~~~ */
const View = (() => {
	const domstr = {
		courseContainer: "#courselist_container",
		selectedCourses: ".selectedCourses",
	};

	const render = (ele, tmp) => {
		ele.innerHTML = tmp;
		// ele,innerHTML = selectedTmp;
	};

	const createTmp = (arr) => {
		let tmp = "";
		arr.forEach((courseList) => {
			tmp += `
			<div class="courslist_container">
				<p>${courseList.courseName}</p>
				<p>Course Type: ${courseList.required ? "Compulsory" : "Elective"}</p>
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
		
		set courseList(newList) {
			this.#courseList = [...newList];
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
	
	const selectedCourses = () => {
		const course_container = document.querySelector(view.domstr.courseContainer);
		course_container.addEventListener('click', (event) => {
			if (event.key === 'click' && event.target.value.trim()) {
				const addedCourse = new model.Course(event.target.value);
				model.addcourse(addedCourse).then((course) => {
					state.courseList = [course]
			});
			}
			model.selectedCourses(event.target.id);
		});
	};
	
	const init = () => {
		model.getCourses().then((course) => {
			state.courseList = [...course];
		});
	};
	
	const bootstrap = () => {
		init();
		selectedCourses();
	};
	return {
		bootstrap,
	};
})(Model, View);

Controller.bootstrap();
