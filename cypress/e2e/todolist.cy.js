describe('TodoList', () => {
  beforeEach(function() {
    cy.visit('http://localhost:8080/index.html?profile=Responsive')
  })

  it('adds a task to the list', () => {
    const now = new Date().toISOString()
    const task = "Do the dishes" + now

    cy.get('[data-test="add-task-input"] input').type(task).type("{enter}")
    cy.get("li:last-child").contains(task)
  })

  it('marks the task as done', function() {
    const switchElement = cy.get("li:last-child").find('[role="switch"]')
    switchElement.click()
    switchElement.should("have.attr", 'aria-checked', 'true')
  })

  it('edits the task', function() {
    cy.get("li:last-child").find('[data-test= "edit-task-button"] > button').click()
    cy.get('[data-test="type-new-task"]').clear().type("wash the plants")
    cy.get('[type="radio"]').first().check()
    cy.get('[data-test= "save-edit-button"] > button').click()

    cy.get("li:last-child").contains("wash the plants")

    const switchElement = cy.get("li:last-child").find('[role="switch"]')
    switchElement.should("have.attr", 'aria-checked', 'true')
  })

  it('deletes the task', () => {
    cy.get("li:last-child").find('[data-test="delete-task-button"] > button').click()
    cy.get("button").contains("OK").click()
  })
})
