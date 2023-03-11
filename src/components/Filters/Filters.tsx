import React from 'react'
import Icon from '../Icon/Icon'
import styles from './Filters.module.css'

const Filters = () => {
  return (
    <div className='desktopHeader'>
      <div className='Filters'>
        <div>
          <div>Sao Paulo</div>
          <Icon name="cerrar" onClick={() => { return }} size={18} />
        </div>
        <div>
          <div>SP</div>
          <Icon name="cerrar" onClick={() => { return }} size={18} />
        </div>
        <div>
          <div>Chevrolet</div>
          <Icon name="cerrar" onClick={() => { return }} size={18} />
        </div>
        <div>
          <div>Cruze</div>
          <Icon name="cerrar" onClick={() => { return }} size={18} />
        </div>
        <div>
          <div>1.4 TSI Comfortline 16v Gaso...</div>
          <Icon name="cerrar" onClick={() => { return }} size={18} />
        </div>
        <div>
          <div>2021</div>
          <Icon name="cerrar" onClick={() => { return }} size={18} />
        </div>
        <div>
          <div>
            Até 38.603 km
          </div>
          <Icon name="cerrar" onClick={() => { return }} size={18} />
        </div>
        <div>
          <div>
            Sedan
          </div>
          <Icon name="cerrar" onClick={() => { return }} size={18} />
        </div>
        {/* Filters */}
      </div>
      <div className={styles.limpiarFiltrosContainer}>
        <Icon name="eliminar" onClick={() => { return }} size={18} />
        <p> Limpiar Filtros</p>
      </div>
    </div>
  )
}

export default Filters