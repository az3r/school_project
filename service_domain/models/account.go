package models

type Account struct {
	Id        string `json:"id"`
	Domain    string `json:"domain"`
	UpdatedAt string `json:"updated_at"`
}

func (a *Account) Equal(b *Account) bool {
	return a.Id == b.Id
}
