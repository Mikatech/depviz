/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */

import React, { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import StoreContext from "../../store";
import { fetchDepviz } from "../../api/depviz";
import "./menu.scss";

const Menu = () => {
  let AppStoreContext = useContext(StoreContext)
  const { updateApiData, updateLayout } = AppStoreContext
  const { register, getValues, setValue, handleSubmit } = useForm();
  let searchParams = new URLSearchParams(window.location.search)

  useEffect(() => {
  }, [])

  const onSubmit = async (data) => {
      const {
        targets,
        withClosed,
        withIsolated,
        withPrs,
        withExternalDeps,
        layout
      } = data;

      // construct url
      let url = `/graph?${targets.split(",").map(target => `targets=${target.trim()}`).join("&")}&withClosed=${withClosed}&withIsolated=${withIsolated}&withPrs=${withPrs}&withoutExternal-deps=${withExternalDeps}&layout=${layout}`

      try {
        const response = await fetchDepviz(url)
        updateApiData(response.data, layout)
      } catch (e) {
        throw e;
      }
  }

  const makeAPICall = async () => {
    const {
      targets,
      withClosed,
      withIsolated,
      withPrs,
      withExternalDeps,
      layout
    } = data;

    // construct url
    let url = `/graph?${targets.split(",").map(target => `targets=${target.trim()}`).join("&")}&withClosed=${withClosed}&withIsolated=${withIsolated}&withPrs=${withPrs}&withoutExternal-deps=${withExternalDeps}&layout=${layout}`

    try {
      const response = await fetchDepviz(url)
      updateApiData(response.data, layout)
    } catch (e) {
      throw e;
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="targets">Repository:</label>
        <input ref={register} type="text" name="targets" id="targets" />
      </div>

      <div className="form-group">
        <input ref={register} type="checkbox" name="withClosed" id="withClosed" onChange={() => onSubmit(getValues(), updateApiData)} />
        <label htmlFor="withClosed">Closed</label>

        <input ref={register} defaultChecked type="checkbox" name="withIsolated" id="withIsolated" onChange={() => onSubmit(getValues(), updateApiData)} />
        <label htmlFor="withIsolated">Isolated</label>

        <input ref={register} defaultChecked type="checkbox" name="withPrs" id="withPrs" onChange={() => onSubmit(getValues(), updateApiData)} />
        <label htmlFor="withPrs">PRs</label>

        <input ref={register} defaultChecked type="checkbox" name="withExternalDeps" id="withExternalDeps" onChange={() => onSubmit(getValues(), updateApiData)} />
        <label htmlFor="withExternalDeps">Ext. Deps</label>
      </div>

      <div className="form-group">
        <label htmlFor="layout">Layout:</label>
        <select ref={register} name="layout" id="layout" onChange={e => updateLayout(e.target.value)}>
          <option value="circle">circle</option>
          <option value="cose">cose</option>
          <option value="breadthfirst">breadthfirst</option>
          <option value="concentric">concentric</option>
          <option value="grid">grid</option>
          <option value="random">random</option>
          <option value="cola">cola</option>
          {/*<option value="elk">elk</option>*/}
        </select>
      </div>

      <div className="button-group">
        <button type="submit">Generate</button>
      </div>
    </form>
  )
}

export default Menu;
