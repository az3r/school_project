package models

import "time"

type Account struct {
	Id        string    `json:"id" db:"id"`
	Domain    string    `json:"domain" db:"domain"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

func (a *Account) Equal(b *Account) bool {
	return a.Id == b.Id
}
