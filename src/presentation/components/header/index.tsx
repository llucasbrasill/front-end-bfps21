import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.scss'
import { PersonOutline, AddOutline, RibbonOutline, GridOutline, NotificationsOutline, SettingsOutline } from 'react-ionicons'

const Header: React.FC = () => {
  return (
    <>
      <header className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.logoWrapper}>
            <span>
              <RibbonOutline
                color={'#FFF'}
                title="Plano"
                height="18px"
                width="18px"
              />
            </span>
            <h1 className={styles.logo}>ProSign</h1>
          </div>

          <div className={styles.navigation}>
            <nav>
              <ul>
                <li>
                  <Link to="/">Visão Geral</Link>
                </li>
                <li>
                  <Link to="/proposals">Propostas</Link>
                </li>
                <li>
                  <Link to="/clients">Clientes</Link>
                </li>
                <li>
                  <Link to="/payments">Pagamentos</Link>
                </li>
                <li>
                  <Link to="">Mais</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className={styles.options}>
            <nav>

                <AddOutline color={'#fff'}
                height="25px"
                width="25px"
                title="Modelos"
                onClick={() => alert('Hi!')}
              />

              <GridOutline
                color={'#fff'}
                height="25px"
                width="25px"
                title="Modelos"
                onClick={() => alert('Hi!')}
              />

              <NotificationsOutline
                color={'#fff'}
                height="25px"
                width="25px"
                onClick={() => alert('Hi!')}
              />

              <SettingsOutline
                color={'#fff'}
                height="25px"
                width="25px"
                onClick={() => alert('Hi!')}
              />
            </nav>

            <div className={styles.profile}>
            <PersonOutline
                color={'#fff'}
                height="25px"
                width="25px"
                onClick={() => alert('Hi!')}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
