import { Form } from "react-router-dom"
import { UserPlusIcon } from "@heroicons/react/24/solid";
import illustration from "../assets/1.jpg"

const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h2>
          Take control of <span className="accent">Your Money</span> instead of wondering where it went
        </h2>
        <p>
          Beware of little expenses; a small leak will sink a great ship. Start your journey today.
        </p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="What is your name?" aria-label="Your Name" autoComplete="given-name"
          />
          <input type="hidden" name="_action" value="newUser" />
          <button type="submit" className="btn btn--dark">
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
      <img src={illustration} alt="budget" width={600} />
    </div>
  )
}
export default Intro