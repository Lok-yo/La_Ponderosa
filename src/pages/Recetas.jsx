import React, { useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import { Icon } from '../components/Icons'
import { recipes } from '../data/recipes'
import { cuts } from '../data/cuts'
import CutModal from '../components/CutModal'
import { useReveal } from '../hooks/useReveal'
import './Recetas.css'

export default function Recetas() {
  useReveal()

  const [activeRecipe, setActiveRecipe] = useState(recipes[0])
  const [selectedCutForModal, setSelectedCutForModal] = useState(null)
  const [checkedIngredients, setCheckedIngredients] = useState({})

  const toggleIngredient = (idx) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }))
  }

  const handleOrderCut = (cutId) => {
    const foundCut = cuts.find((c) => c.id === cutId)
    if (foundCut) {
      setSelectedCutForModal(foundCut)
    }
  }

  return (
    <>
      <Breadcrumbs />

      <CutModal
        cut={selectedCutForModal}
        onClose={() => setSelectedCutForModal(null)}
      />

      <header className="page-header">
        <div className="container-narrow">
          <span className="eyebrow reveal">Recetario de la Casa</span>
          <h1 className="page-header__title reveal">Recetas Gourmet La Ponderosa</h1>
          <p className="page-header__lead reveal">
            Platillos icónicos paso a paso diseñados por nuestros maestros carniceros.
            Selecciona una receta, checa sus ingredientes y pide la carne directo a tu casa.
          </p>
        </div>
      </header>

      <section className="section recipes-section">
        <div className="container">
          {/* Recipe Selector Tabs */}
          <div className="recipe-tabs reveal">
            {recipes.map((r) => (
              <button
                key={r.id}
                className={`recipe-tab ${activeRecipe.id === r.id ? 'recipe-tab--active' : ''}`}
                onClick={() => {
                  setActiveRecipe(r)
                  setCheckedIngredients({})
                }}
              >
                <strong>{r.title}</strong>
                <span>Corte: {r.cutName}</span>
              </button>
            ))}
          </div>

          {/* Active Recipe Detail Box */}
          <div className="recipe-detail reveal">
            <div className="recipe-hero">
              <div className="recipe-hero__media">
                <img src={activeRecipe.image} alt={activeRecipe.title} />
              </div>
              <div className="recipe-hero__content">
                <span className="eyebrow eyebrow--gold">{activeRecipe.cutName}</span>
                <h2>{activeRecipe.title}</h2>
                <p className="recipe-hero__subtitle">{activeRecipe.subtitle}</p>

                <div className="recipe-meta-grid">
                  <div className="recipe-meta-item">
                    <Icon.Clock size={16} />
                    <div>
                      <span>Prep / Cocción</span>
                      <strong>{activeRecipe.prepTime} / {activeRecipe.cookTime}</strong>
                    </div>
                  </div>

                  <div className="recipe-meta-item">
                    <Icon.Award size={16} />
                    <div>
                      <span>Dificultad</span>
                      <strong>{activeRecipe.difficulty}</strong>
                    </div>
                  </div>

                  <div className="recipe-meta-item">
                    <Icon.Sparkle size={16} />
                    <div>
                      <span>Porciones</span>
                      <strong>{activeRecipe.servings}</strong>
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn--primary recipe-order-btn"
                  onClick={() => handleOrderCut(activeRecipe.cutId)}
                >
                  <Icon.ShoppingBag size={18} />
                  Pedir {activeRecipe.cutName} para esta receta
                </button>
              </div>
            </div>

            <div className="recipe-body-grid">
              {/* Ingredients Checklist */}
              <div className="recipe-ingredients">
                <h3>Ingredientes:</h3>
                <ul>
                  {activeRecipe.ingredients.map((ing, idx) => {
                    const isChecked = !!checkedIngredients[idx]
                    return (
                      <li
                        key={idx}
                        className={isChecked ? 'ingredient--checked' : ''}
                        onClick={() => toggleIngredient(idx)}
                      >
                        <span className="checkbox-custom">
                          {isChecked && <Icon.Check size={12} />}
                        </span>
                        <span>{ing}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Instructions */}
              <div className="recipe-steps">
                <h3>Paso a Paso:</h3>
                <ol>
                  {activeRecipe.steps.map((step, idx) => (
                    <li key={idx}>
                      <span className="step-num">{idx + 1}</span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>

                {activeRecipe.proTip && (
                  <div className="recipe-protip">
                    <Icon.Flame size={20} />
                    <div>
                      <strong>Consejo del Carnicero:</strong>
                      <p>{activeRecipe.proTip}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
