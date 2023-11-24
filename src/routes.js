import React from 'react'


const EtatDeStock = React.lazy(() => import('./views/etatDeStock/Etat_de_stock'))
const form_etatDeStock= React.lazy(()=>import ('./views/etatDeStock/Form_etat_de_stock'))
const sortietDeStock=React.lazy(()=>import('./views/sortieDeStock/Sortie_de_stock'))
const form_sortieDeStock = React.lazy(()=>import('./views/sortieDeStock/Form_sortie_de_stock'))
const mvvalide = React.lazy(()=>import('./views/mouvements/MvValide'))
const mvNonvalide = React.lazy(()=>import('./views/mouvements/MvNonValide'))
const mvAttente = React.lazy(()=>import('./views/mouvements/MvEnAttente'))
const stock=React.lazy(()=>import ('./views/EntreStock'))
const lstock=React.lazy(()=>import ('./views/Listestock'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/form_etatDeStock', name: 'form_etatDeStock', element: form_etatDeStock },
  { path: '/etatDeStock', name: 'etatDeStock', element: EtatDeStock },
  { path: '/form_sortieDeStock', name: 'form_etatDeStock', element: form_sortieDeStock },
  { path: '/sortietDeStock', name: 'sortietDeStock', element: sortietDeStock },
  { path: '/mvvalide', name: 'mvvalide', element: mvvalide },
  { path: '/mvNonvalide', name: 'mvNonvalide', element: mvNonvalide },
  { path: '/mvAttente', name: 'mvAttente', element: mvAttente },
  { path: '/stock', name: 'stock', element: stock },
  { path: '/lstock', name: 'lstock', element: lstock },

]

export default routes
