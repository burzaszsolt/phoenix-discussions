defmodule DiscussWeb.Plugs.RequireAuth do
  use Phoenix.VerifiedRoutes, endpoint: DiscussWeb.Endpoint, router: DiscussWeb.Router
  import Plug.Conn
  import Phoenix.Controller

  def init(_params) do
  end

  def call(conn, _params) do
    if (conn.assigns[:user]) do
      conn
    else
      conn
        |> put_flash(:error, "You must be logged in")
        |> redirect(to: ~p"/")
        |> halt()
    end
  end
end
