class CreateApiV1CalorieEntries < ActiveRecord::Migration[5.2]
  def change
    create_table :calorie_entries do |t|
      t.float :calorie
      t.string :note

      t.timestamps
    end
  end
end
