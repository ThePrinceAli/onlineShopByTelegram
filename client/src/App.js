import React, { useEffect, useState } from 'react'
import axios from 'axios'

const TELEGRAM_BOT_TOKEN = '8061365396:AAHXi81W49ahfWw2fj3Yr12r8mdlg_eBirw'

const App = () => {
  const [products, setProducts] = useState([])
  const [filePaths, setFilePaths] = useState({})

  useEffect(() => {
    const fetchProductsAndPaths = async () => {
      try {
        const res = await axios.get('http://localhost:4100')
        const data = res.data
        setProducts(data)

        // For each product, get the file_path from Telegram
        const promises = data.map(async (item) => {
          const fileInfo = await axios.get(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile?file_id=${item.img}`
          )
          return {
            id: item._id, // assuming your product has an _id
            path: `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${fileInfo.data.result.file_path}`,
          }
        })

        const results = await Promise.all(promises)

        const pathsObj = {}
        results.forEach(({ id, path }) => {
          pathsObj[id] = path
        })
        setFilePaths(pathsObj)
      } catch (err) {
        console.log(err)
      }
    }

    fetchProductsAndPaths()
  }, [])

  return (
    <div>
      {products.length ? (
        products.map((item) => (
          <div key={item._id}>
            <h2>Title: {item.title}</h2>
            <h2>Price: {item.price}</h2>
            <h2>Definition: {item.definition}</h2>
            <img
              width="200"
              src={filePaths[item._id]}
              alt={item.title}
            />
          </div>
        ))
      ) : (
        'Loading...'
      )}
    </div>
  )
}

export default App
